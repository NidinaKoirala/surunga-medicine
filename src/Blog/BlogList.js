import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaSearch } from 'react-icons/fa';
import BlogLocalStorage from './BlogLocalStorage';
import CloudinaryImageService from './CloudinaryImageService';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    // Load blogs from local storage
    useEffect(() => {
        setLoading(true);
        try {
            const loadedBlogs = BlogLocalStorage.getAllBlogs();
            setBlogs(loadedBlogs);
            setFilteredBlogs(loadedBlogs);
        } catch (error) {
            console.error("Error loading blogs:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Get all unique categories from blogs
    const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

    // Filter blogs based on search term and category
    useEffect(() => {
        let results = blogs;
        
        // Filter by search term
        if (searchTerm) {
            results = results.filter(blog => 
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        // Filter by category
        if (selectedCategory !== 'All') {
            results = results.filter(blog => blog.category === selectedCategory);
        }
        
        setFilteredBlogs(results);
    }, [searchTerm, selectedCategory, blogs]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Get proper image URL (Cloudinary or external)
    const getImageUrl = (imageSource) => {
        if (CloudinaryImageService.isImageId(imageSource)) {
            return CloudinaryImageService.getImageUrl(imageSource);
        }
        return imageSource;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading blogs...</p>
            </div>
        );
    }

    return (
        <section className="blog-section">
            <div className="blog-header">
                <div className="container">
                    <h1>Health & Wellness Blog</h1>
                    <p>Stay informed with the latest insights in healthcare, wellness, and medical advancements</p>
                </div>
            </div>
            
            <div className="container blog-container">
                <div className="row">
                    <div className="col-lg-8">
                        {/* Search bar for mobile */}
                        <div className="blog-search-mobile">
                            <div className="search-input">
                                <FaSearch className="search-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Search articles..." 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        {/* Category tabs for mobile */}
                        <div className="category-tabs-mobile">
                            <div className="category-scroll">
                                {categories.map((category, index) => (
                                    <button 
                                        key={index}
                                        className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Blog posts */}
                        <div className="blog-posts">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map(blog => (
                                    <div className="blog-card" key={blog.id}>
                                        <div className="blog-image">
                                            <Link to={`/Blog/${blog.id}`}>
                                                <img src={getImageUrl(blog.image)} alt={blog.title} />
                                            </Link>
                                            <div className="blog-category">
                                                <span>{blog.category}</span>
                                            </div>
                                        </div>
                                        <div className="blog-content">
                                            <h2 className="blog-title">
                                                <Link to={`/Blog/${blog.id}`}>{blog.title}</Link>
                                            </h2>
                                            <div className="blog-meta">
                                                <span><FaUser /> {blog.author}</span>
                                                <span><FaCalendarAlt /> {blog.date}</span>
                                                <span><FaClock /> {blog.readTime}</span>
                                            </div>
                                            <p className="blog-excerpt">{blog.excerpt}</p>
                                            <div className="blog-tags">
                                                {blog.tags.map((tag, index) => (
                                                    <span key={index} className="blog-tag">
                                                        <FaTag /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link to={`/Blog/${blog.id}`} className="read-more">
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">
                                    <h3>No articles found</h3>
                                    <p>Try adjusting your search or filter to find what you're looking for.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="blog-sidebar">
                            {/* Search widget */}
                            <div className="sidebar-widget search-widget">
                                <h3>Search Articles</h3>
                                <div className="search-input">
                                    <FaSearch className="search-icon" />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            
                            {/* Categories widget */}
                            <div className="sidebar-widget categories-widget">
                                <h3>Categories</h3>
                                <ul className="category-list">
                                    {categories.map((category, index) => (
                                        <li 
                                            key={index} 
                                            className={selectedCategory === category ? 'active' : ''}
                                            onClick={() => handleCategoryChange(category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            {/* Recent posts widget */}
                            <div className="sidebar-widget recent-posts-widget">
                                <h3>Recent Posts</h3>
                                <div className="recent-posts">
                                    {blogs.slice(0, 3).map(blog => (
                                        <div className="recent-post" key={blog.id}>
                                            <div className="recent-post-image">
                                                <Link to={`/Blog/${blog.id}`}>
                                                    <img src={getImageUrl(blog.image)} alt={blog.title} />
                                                </Link>
                                            </div>
                                            <div className="recent-post-content">
                                                <h4>
                                                    <Link to={`/Blog/${blog.id}`}>{blog.title}</Link>
                                                </h4>
                                                <span><FaCalendarAlt /> {blog.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Tags widget */}
                            <div className="sidebar-widget tags-widget">
                                <h3>Popular Tags</h3>
                                <div className="tag-cloud">
                                    {[...new Set(blogs.flatMap(blog => blog.tags))].map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="tag"
                                            onClick={() => setSearchTerm(tag)}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogList;