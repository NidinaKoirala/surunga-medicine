// Cloudinary Image Upload Service
// This service handles image uploads to Cloudinary instead of localStorage

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
    cloudName: 'dp6z8e3zf',
    apiKey: '349871589432614',
    uploadPreset: 'surunga_medicine_blog' // Using the preset specified
};
  
// Storage key for saving image metadata in localStorage
const IMAGES_STORAGE_KEY = "surunga_medicine_blog_cloudinary_images";
  
// List of allowed image MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];

// Initialize the image metadata storage in localStorage with fallback for private browsing
const initImageStorage = () => {
    try {
        if (!localStorage.getItem(IMAGES_STORAGE_KEY)) {
            localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify({}));
        }
    } catch (error) {
        console.warn('LocalStorage not available:', error);
        // Create a fallback if localStorage is not available
        if (!window._cloudinaryImagesMemoryStorage) {
            window._cloudinaryImagesMemoryStorage = {};
        }
    }
};

// Save image metadata with fallback for private browsing
const saveImageMetadata = (data) => {
    try {
        localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('Error saving to localStorage, using memory fallback:', error);
        window._cloudinaryImagesMemoryStorage = data;
    }
};
  
// Get all stored image metadata with fallback for private browsing
const getAllImageMetadata = () => {
    initImageStorage();
    try {
        const data = localStorage.getItem(IMAGES_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.warn('Error retrieving image metadata from localStorage:', error);
        return window._cloudinaryImagesMemoryStorage || {};
    }
};
  
// Generate a unique ID for an image
const generateImageId = () => {
    return `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
  
const CloudinaryImageService = {
    // Upload image to Cloudinary
    async uploadImage(file) {
        try {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                throw new Error(`File size exceeds the 10MB limit`);
            }
            
            // Check file type
            if (!ALLOWED_TYPES.includes(file.type)) {
                throw new Error(`Unsupported file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`);
            }
            
            // Create a FormData object to send to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
            formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);
            
            console.log('Uploading to Cloudinary...', CLOUDINARY_CONFIG.cloudName, CLOUDINARY_CONFIG.uploadPreset);
            
            // Upload to Cloudinary via fetch API
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
            }
            
            // Parse the response
            const data = await response.json();
            console.log('Cloudinary response:', data);
            
            // Generate a unique ID for our system
            const imageId = generateImageId();
            
            // Store image metadata
            const imageData = {
                id: imageId,
                name: file.name,
                type: file.type,
                size: file.size,
                url: data.secure_url,  // Always use secure_url
                cloudinaryId: data.public_id,
                uploadDate: new Date().toISOString()
            };
            
            console.log('Generated image metadata:', imageData);
            
            // Save metadata to storage
            const allImages = getAllImageMetadata();
            allImages[imageId] = imageData;
            saveImageMetadata(allImages);
            
            console.log('Image metadata saved to storage');
            
            return imageData;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            throw error;
        }
    },
    
    // Get image metadata by ID
    getImageMetadata(imageId) {
        if (!imageId) return null;
        
        // If it's a full URL, return a mock metadata object
        if (typeof imageId === 'string' && imageId.startsWith('http')) {
            return {
                id: 'external',
                url: imageId
            };
        }
        
        const allImages = getAllImageMetadata();
        return allImages[imageId] || null;
    },
    
    // Get image URL by ID or return the original URL
    getImageUrl(imageIdOrUrl) {
        // If it's not a string or null/undefined, return it as is
        if (!imageIdOrUrl || typeof imageIdOrUrl !== 'string') {
            return imageIdOrUrl;
        }
        
        // If it's already a URL, return it directly
        if (imageIdOrUrl.startsWith('http')) {
            return imageIdOrUrl;
        }
        
        // If it's an image ID, look up the URL in storage
        if (imageIdOrUrl.startsWith('img_')) {
            const image = this.getImageMetadata(imageIdOrUrl);
            if (image && image.url) {
                console.log(`Found URL for ${imageIdOrUrl}:`, image.url);
                return image.url;
            }
            console.warn(`No URL found for image ID: ${imageIdOrUrl}`);
        }
        
        // If nothing matches, return the original input
        return imageIdOrUrl;
    },
    
    // Get image URL with transformations
    getImageUrlWithTransformations(imageIdOrUrl, transformations = {}) {
        // Get the base URL
        const baseUrl = this.getImageUrl(imageIdOrUrl);
        
        if (!baseUrl || !baseUrl.startsWith('http')) {
            return baseUrl; // Return original if not a valid URL
        }
        
        try {
            // Parse the URL
            const url = new URL(baseUrl);
            
            // Skip if not Cloudinary
            if (!url.hostname.includes('cloudinary.com')) {
                return baseUrl;
            }
            
            // Get the path segments
            const pathSegments = url.pathname.split('/');
            
            // Find the "upload" segment
            const uploadIndex = pathSegments.findIndex(segment => segment === 'upload');
            
            if (uploadIndex === -1) {
                return baseUrl; // Not a standard Cloudinary URL
            }
            
            // Default transformations if not specified
            const {
                width = 800,       // Default max width
                height = 0,        // 0 means auto
                crop = 'limit',    // limit = keep aspect ratio and only scale down
                quality = 'auto',  // auto = optimal quality/size ratio
                format = 'auto'    // auto = optimal format based on browser
            } = transformations;
            
            // Build transformation string
            let transformationStr = '';
            
            if (width > 0) {
                transformationStr += `w_${width},`;
            }
            
            if (height > 0) {
                transformationStr += `h_${height},`;
            }
            
            transformationStr += `c_${crop},q_${quality},f_${format}`;
            
            // Insert transformation into path
            pathSegments.splice(uploadIndex + 1, 0, transformationStr);
            
            // Rebuild URL
            url.pathname = pathSegments.join('/');
            
            return url.toString();
        } catch (error) {
            console.error('Error creating transformed URL:', error);
            return baseUrl; // Return original URL on error
        }
    },
    
    // Check if an ID is an image ID (for checking if path is a Cloudinary image)
    isImageId(id) {
        return id && typeof id === 'string' && id.startsWith('img_');
    },
    
    // Delete an image from metadata storage
    async deleteImage(imageId) {
        try {
            const imageData = this.getImageMetadata(imageId);
            if (!imageData) {
                return false;
            }
            
            // Note: Deleting images from Cloudinary requires server-side authentication
            // This would need to be handled by a backend service
            // For now, we'll just remove it from our local metadata
            
            const allImages = getAllImageMetadata();
            delete allImages[imageId];
            saveImageMetadata(allImages);
            
            return true;
        } catch (error) {
            console.error("Error deleting image:", error);
            return false;
        }
    },
    
    // Get all image metadata
    getAllImages() {
        return Object.values(getAllImageMetadata());
    },
    
    // Clean up unused images metadata
    cleanupUnusedImageMetadata(usedImageIds) {
        const allImages = getAllImageMetadata();
        let cleanedCount = 0;
        
        // Create a set of all used image IDs for faster lookup
        const usedIdsSet = new Set(usedImageIds);
        
        // Remove any images that are not in the used IDs list
        Object.keys(allImages).forEach(imageId => {
            if (!usedIdsSet.has(imageId)) {
                delete allImages[imageId];
                cleanedCount++;
            }
        });
        
        // Save updated images back to storage
        if (cleanedCount > 0) {
            saveImageMetadata(allImages);
        }
        
        return cleanedCount;
    },
    
    // Special method to verify an image ID and log detailed information
    verifyImageId(imageId) {
        console.group(`Verifying image ID: ${imageId}`);
        
        // Check if it's a valid ID format
        const isValidFormat = this.isImageId(imageId);
        console.log('Valid ID format:', isValidFormat);
        
        if (!isValidFormat) {
            console.warn('Invalid image ID format');
            console.groupEnd();
            return false;
        }
        
        // Check if the ID exists in storage
        const metadata = this.getImageMetadata(imageId);
        console.log('Found metadata:', metadata ? 'Yes' : 'No');
        
        if (metadata) {
            console.log('Image name:', metadata.name);
            console.log('Image URL:', metadata.url);
            console.log('Upload date:', metadata.uploadDate);
        } else {
            console.warn('Image metadata not found in storage');
        }
        
        console.groupEnd();
        return !!metadata;
    },
    
    // Initialize and optionally reset the image storage
    initialize(reset = false) {
        if (reset) {
            try {
                saveImageMetadata({});
                console.log('CloudinaryImageService initialized with empty storage');
            } catch (error) {
                console.error('Error resetting image storage:', error);
            }
        } else {
            initImageStorage();
            console.log('CloudinaryImageService initialized');
        }
        
        // Return the current storage state
        return this.debugStorage();
    }
};
  
// Initialize storage on load
initImageStorage();
  
// Add a debug method to inspect current storage
CloudinaryImageService.debugStorage = () => {
    const allImages = getAllImageMetadata();
    console.log('Current image metadata in storage:', allImages);
    return allImages;
};
  
export default CloudinaryImageService;