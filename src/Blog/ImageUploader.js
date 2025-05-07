import React, { useState, useEffect, useRef } from 'react';
import { FaUpload, FaTimes, FaImage, FaSpinner } from 'react-icons/fa';
import CloudinaryImageService from './CloudinaryImageService';
import './ImageUploader.css';

function ImageUploader({ onImageSelect, currentImage, label = "Upload Image" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    // Initialize with current image if available
    useEffect(() => {
        if (currentImage) {
            let imageUrl;
            
            if (CloudinaryImageService.isImageId(currentImage)) {
                // If it's a Cloudinary image ID, get the URL
                imageUrl = CloudinaryImageService.getImageUrl(currentImage);
            } else {
                // If it's an external URL, use it directly
                imageUrl = currentImage;
            }
            
            if (imageUrl) {
                console.log(`Setting preview for ${currentImage} to ${imageUrl}`);
                setPreview(imageUrl);
            } else {
                console.error(`Could not find URL for image: ${currentImage}`);
            }
        } else {
            // Clear preview if no current image
            setPreview(null);
        }
    }, [currentImage]);

    // Handle file input change
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError('');
        setIsUploading(true);
        setUploadProgress(0);

        try {
            // Create a local object URL for preview
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 300);

            // Upload the image to Cloudinary
            const uploadedImage = await CloudinaryImageService.uploadImage(file);
            
            // Clear the progress interval
            clearInterval(progressInterval);
            
            // Log the uploaded image data for debugging
            console.log('Uploaded image data:', uploadedImage);
            
            // Call the callback with the image ID
            onImageSelect(uploadedImage.id);
            
            // Revoke the preview URL and set the Cloudinary URL instead
            URL.revokeObjectURL(previewUrl);
            setPreview(uploadedImage.url);
            
            // Set progress to 100% when done
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);
            
            console.log('Image uploaded successfully!', uploadedImage);
            
        } catch (error) {
            setError(error.message || 'Failed to upload image');
            setPreview(null);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle external URL input
    const handleUrlInput = () => {
        const url = prompt('Enter image URL:');
        if (url && url.trim()) {
            setPreview(url);
            onImageSelect(url);
        }
    };

    // Handle removing the image
    const handleRemoveImage = () => {
        setPreview(null);
        onImageSelect('');
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="image-uploader">
            <div className="uploader-label">{label}</div>
            
            {error && (
                <div className="upload-error">
                    <p>{error}</p>
                </div>
            )}
            
            {preview ? (
                <div className="image-preview-container">
                    <img src={preview} alt="Preview" className="image-preview" />
                    <button 
                        type="button" 
                        className="remove-image-btn" 
                        onClick={handleRemoveImage}
                        title="Remove image"
                    >
                        <FaTimes />
                    </button>
                </div>
            ) : (
                <div className="upload-controls">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                        id="image-upload"
                        ref={fileInputRef}
                        disabled={isUploading}
                    />
                    
                    <label htmlFor="image-upload" className={`upload-btn ${isUploading ? 'uploading' : ''}`}>
                        {isUploading ? (
                            <>
                                <FaSpinner className="spinner-icon" />
                                <span>Uploading... {uploadProgress}%</span>
                            </>
                        ) : (
                            <>
                                <FaUpload />
                                <span>Select File</span>
                            </>
                        )}
                    </label>
                    
                    <div className="upload-divider">
                        <span>or</span>
                    </div>
                    
                    <button 
                        type="button" 
                        className="url-btn"
                        onClick={handleUrlInput}
                        disabled={isUploading}
                    >
                        <FaImage />
                        <span>Use URL</span>
                    </button>
                </div>
            )}
            
            {uploadProgress > 0 && (
                <div className="upload-progress-container">
                    <div 
                        className="upload-progress-bar"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}
            
            <div className="upload-help">
                <small>Supported formats: JPG, PNG, GIF, WebP. Max size: 10MB</small>
            </div>
        </div>
    );
}

export default ImageUploader;