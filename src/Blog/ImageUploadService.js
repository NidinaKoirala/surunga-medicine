// Service for handling image uploads and storage

// Maximum file size (5MB in bytes)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Storage key for saving images in localStorage
const IMAGES_STORAGE_KEY = "medconnect_blog_images";

// List of allowed image MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];

// Initialize the image storage in localStorage
const initImageStorage = () => {
  if (!localStorage.getItem(IMAGES_STORAGE_KEY)) {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify({}));
  }
};

// Get all stored images
const getAllImages = () => {
  initImageStorage();
  try {
    return JSON.parse(localStorage.getItem(IMAGES_STORAGE_KEY) || "{}");
  } catch (error) {
    console.error("Error retrieving images from storage:", error);
    return {};
  }
};

// Generate a unique ID for an image
const generateImageId = () => {
  return `img_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Read a file and convert it to base64
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

const ImageUploadService = {
  // Upload and store an image
  async uploadImage(file) {
    try {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
      }
      
      // Check file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`Unsupported file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`);
      }
      
      // Convert file to base64
      const base64String = await readFileAsBase64(file);
      
      // Generate a unique ID for the image
      const imageId = generateImageId();
      
      // Store image data
      const imageData = {
        id: imageId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: base64String,
        uploadDate: new Date().toISOString()
      };
      
      // Save to localStorage
      const allImages = getAllImages();
      allImages[imageId] = imageData;
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(allImages));
      
      return imageData;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
  
  // Get an image by ID
  getImage(imageId) {
    const allImages = getAllImages();
    return allImages[imageId] || null;
  },
  
  // Delete an image
  deleteImage(imageId) {
    const allImages = getAllImages();
    if (allImages[imageId]) {
      delete allImages[imageId];
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(allImages));
      return true;
    }
    return false;
  },
  
  // Get all images
  getAllImages() {
    return Object.values(getAllImages());
  },
  
  // Check if an ID is an image ID (for checking if path is a local image)
  isImageId(id) {
    return id && typeof id === 'string' && id.startsWith('img_');
  },
  
  // Get image URL from ID or return original URL
  getImageUrl(imageIdOrUrl) {
    // If it's already a full URL or a relative path, return it
    if (!this.isImageId(imageIdOrUrl)) {
      return imageIdOrUrl;
    }
    
    // Otherwise, look up the image in storage
    const image = this.getImage(imageIdOrUrl);
    return image ? image.data : null;
  },
  
  // Calculate storage usage
  getStorageUsage() {
    const allImages = JSON.stringify(getAllImages());
    const bytes = new Blob([allImages]).size;
    
    return {
      bytes,
      kilobytes: bytes / 1024,
      megabytes: bytes / (1024 * 1024),
      percentage: (bytes / (10 * 1024 * 1024)) * 100 // Assuming 10MB localStorage limit
    };
  },
  
  // Clean up old images that are not being used by any blog posts
  cleanupUnusedImages(usedImageIds) {
    const allImages = getAllImages();
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
    
    // Save updated images back to localStorage
    if (cleanedCount > 0) {
      localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(allImages));
    }
    
    return cleanedCount;
  }
};

// Initialize storage on load
initImageStorage();

export default ImageUploadService;