import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye, FaPlus, FaSignOutAlt, FaSearch, FaImage, FaDatabase, FaBroom } from 'react-icons/fa';
import BlogLocalStorage from '../Blog/BlogLocalStorage';
import AuthService from '../Blog/AuthService';
import CloudinaryImageService from '../Blog/CloudinaryImageService';
import './AdminDashboard.css';

function AdminDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [adminName, setAdminName] = useState('');
    const [cloudinaryImages, setCloudinaryImages] = useState([]);
    const navigate = useNavigate();

    // Check authentication and load blogs
    useEffect(() => {
        // Initialize Cloudinary service
        CloudinaryImageService.initialize();
        
        // Redirect if not authenticated
        if (!AuthService.isAuthenticated()) {
            navigate('/Admin/login');
            return;
        }

        // Set admin name
        setAdminName(AuthService.getAdminUsername());

        // Load blogs
        try {
            const allBlogs = BlogLocalStorage.getAllBlogs();
            setBlogs(allBlogs);
            setFilteredBlogs(allBlogs);
            
            // Get all Cloudinary images
            const allImages = CloudinaryImageService.getAllImages();
            setCloudinaryImages(allImages);
            
            // Debug images
            console.log('Loaded Cloudinary images:', allImages);
            
        } catch (error) {
            console.error("Error loading blogs or images:", error);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Filter blogs based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = blogs.filter(blog => 
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.tags && blog.tags.some(tag => 
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                ))
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }, [searchTerm, blogs]);

    // Handle logout
    const handleLogout = () => {
        AuthService.logout();
        navigate('/Blog');
    };

    // Handle blog deletion
    const handleDeleteBlog = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                BlogLocalStorage.deleteBlog(id);
                setBlogs(prev => prev.filter(blog => blog.id !== id));
                alert('Blog post deleted successfully!');
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert('Failed to delete blog post. Please try again.');
            }
        }
    };

    // Clean up unused images
    const cleanupUnusedImages = () => {
        try {
            // Get all image IDs used in blogs (both featured images and in content)
            const usedImageIds = [];
            
            blogs.forEach(blog => {
                // Add featured image if it's a local image
                if (CloudinaryImageService.isImageId(blog.image)) {
                    usedImageIds.push(blog.image);
                }
                
                // Find image IDs in content
                if (blog.content) {
                    const regex = /!\[(.*?)\]\((img_[^)]+)\)/g;
                    let match;
                    while ((match = regex.exec(blog.content)) !== null) {
                        usedImageIds.push(match[2]);
                    }
                }
            });
            
            console.log("Used image IDs:", usedImageIds);
            
            // Perform cleanup
            const removedCount = CloudinaryImageService.cleanupUnusedImageMetadata(usedImageIds);
            
            // Refresh images list
            const allImages = CloudinaryImageService.getAllImages();
            setCloudinaryImages(allImages);
            
            alert(`Cleanup complete. Removed ${removedCount} unused images.`);
        } catch (error) {
            console.error("Error cleaning up images:", error);
            alert('Failed to clean up unused images. Please try again.');
        }
    };

    // Calculate approximate storage metrics
    const calculateStorageUsage = () => {
        // This is just an approximation since we're only storing metadata
        const totalImages = cloudinaryImages.length;
        const totalSize = cloudinaryImages.reduce((sum, img) => sum + (img.size || 0), 0);
        const sizeInMB = totalSize / (1024 * 1024);
        
        return {
            count: totalImages,
            size: totalSize,
            megabytes: sizeInMB,
            percentage: Math.min((sizeInMB / 10) * 100, 100) // Assuming 10MB quota
        };
    };
    
    // Get storage usage - and actually use it to display the percentage in the UI
    const storageUsage = calculateStorageUsage();

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Loading admin dashboard...</p>
            </div>
        );
    }

    return (
        <section className="admin-dashboard-section">
            <div className="admin-header">
                <div className="container">
                    <div className="admin-header-content">
                        <h1>Blog Administration</h1>
                        <div className="admin-actions">
                            <span className="admin-welcome">
                                Welcome, {adminName}
                            </span>
                            <button className="admin-logout" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="admin-toolbar">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/Blog/new" className="create-blog-btn">
                        <FaPlus /> Create New Blog
                    </Link>
                </div>

                {/* Storage/Image Usage widget - now using the storageUsage variable */}
                <div className="storage-usage-widget">
                    <h3>
                        <FaDatabase /> Cloudinary Image Management
                    </h3>
                    <div className="usage-bar">
                        <div 
                            className="usage-fill" 
                            style={{ width: `${storageUsage.percentage}%` }}
                        ></div>
                    </div>
                    <div className="usage-details">
                        <span>{cloudinaryImages.length} images ({storageUsage.megabytes.toFixed(2)} MB)</span>
                        <button onClick={cleanupUnusedImages} className="cleanup-btn">
                            <FaBroom /> Clean Unused Images
                        </button>
                    </div>
                </div>

                <div className="blog-list-table-container">
                    {filteredBlogs.length > 0 ? (
                        <table className="blog-list-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map(blog => {
                                    // Get the proper image URL (using CloudinaryImageService)
                                    const imageUrl = CloudinaryImageService.isImageId(blog.image)
                                        ? CloudinaryImageService.getImageUrl(blog.image)
                                        : blog.image;
                                        
                                    return (
                                        <tr key={blog.id}>
                                            <td>{blog.id}</td>
                                            <td className="blog-thumbnail">
                                                {blog.image ? (
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={blog.title} 
                                                        className="thumbnail-img"
                                                    />
                                                ) : (
                                                    <div className="no-thumbnail">
                                                        <FaImage />
                                                    </div>
                                                )}
                                            </td>
                                            <td>{blog.title}</td>
                                            <td>{blog.category}</td>
                                            <td>{blog.date}</td>
                                            <td className="blog-actions">
                                                <Link to={`/Blog/${blog.id}`} className="view-blog" title="View Blog">
                                                    <FaEye />
                                                </Link>
                                                <Link to={`/Blog/edit/${blog.id}`} className="edit-blog" title="Edit Blog">
                                                    <FaEdit />
                                                </Link>
                                                <button 
                                                    className="delete-blog" 
                                                    onClick={() => handleDeleteBlog(blog.id, blog.title)}
                                                    title="Delete Blog"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-blogs-message">
                            <p>No blogs found matching your search criteria.</p>
                            {searchTerm && (
                                <button 
                                    className="clear-search" 
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Cloudinary Image Gallery Section */}
                <div className="image-management-section">
                    <h2><FaImage /> Cloudinary Uploaded Images</h2>
                    <div className="image-gallery">
                        {cloudinaryImages.map(image => (
                            <div className="image-item" key={image.id}>
                                <div className="image-preview">
                                    <img 
                                        src={image.url} 
                                        alt={image.name || "Uploaded image"} 
                                        onError={(e) => {
                                            console.error("Error loading image:", image.id);
                                            e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                                        }} 
                                    />
                                </div>
                                <div className="image-info">
                                    <span className="image-name">{image.name}</span>
                                    <span className="image-size">
                                        {(image.size / 1024).toFixed(2)} KB
                                    </span>
                                </div>
                                <div className="image-id-display">
                                    ID: {image.id}
                                </div>
                            </div>
                        ))}
                        {cloudinaryImages.length === 0 && (
                            <div className="no-images-message">
                                <p>No images have been uploaded yet.</p>
                                <p>Images will appear here when you upload them while creating or editing blog posts.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminDashboard;