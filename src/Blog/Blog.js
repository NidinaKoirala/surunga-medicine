import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getAllBlogPosts } from '../utils/blogUtils';
import './Blog.css';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const postsPerPage = 6;

  // Image component with loading state
  function LazyImage({ src, alt, className }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(false);
    
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
    
    const handleImageError = () => {
      setError(true);
    };
    
    return (
      <div className={`image-container ${className || ''}`}>
        {!imageLoaded && !error && (
          <div className="image-placeholder">
            <div className="loading-spinner-small"></div>
          </div>
        )}
        {error && (
          <div className="image-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <path d="M21 15l-5-5L5 21"></path>
            </svg>
          </div>
        )}
        <img 
          src={src} 
          alt={alt} 
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  }

  // Function to preload images
  const preloadImages = (posts) => {
    if (!posts || !Array.isArray(posts) || posts.length === 0) return;
    
    const imagePromises = posts
      .filter(post => post.coverImage)
      .map(post => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error to continue
          img.src = post.coverImage;
        });
      });
    
    // When all images are preloaded, set the state
    Promise.all(imagePromises).then(() => {
      setImagesPreloaded(true);
    });
  };

  // FIXED: Added timeout and better error handling
  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Blog: Starting to fetch blog posts');
        
        // FIXED: Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          setError('Request timed out. Please check your blog files are accessible.');
          setLoading(false);
        }, 8000); // 8 second timeout
        
        const posts = await getAllBlogPosts();
        
        // FIXED: Clear timeout if successful
        clearTimeout(timeoutId);
        
        console.log('Blog: Successfully fetched posts:', posts.length);
        
        // Start preloading images
        preloadImages(posts);
        
        setBlogPosts(posts);
        setError(null);
        
      } catch (err) {
        console.error('Blog: Error fetching blog posts:', err);
        
        // FIXED: Better error message
        setError(`Failed to load blog posts: ${err.message || 'Unknown error'}`);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  // Get all unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))];

  // Get all unique tags and count occurrences
  const tagCounts = blogPosts.reduce((counts, post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
    return counts;
  }, {});

  // Sort tags by occurrence count (descending)
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  // Get recent posts (5 most recent)
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Filter posts by category, tag, and search term
  const filteredPosts = blogPosts.filter(post => {
    // Check if the post matches the selected category
    const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
    
    // Check if the post matches the selected tag
    const tagMatch = !activeTag || (post.tags && post.tags.includes(activeTag));
    
    // Check if the post matches the search term
    const term = searchTerm.toLowerCase();
    const searchMatch = term === '' || 
      post.title.toLowerCase().includes(term) || 
      post.excerpt.toLowerCase().includes(term) ||
      (post.content && post.content.toLowerCase().includes(term));
    
    return categoryMatch && tagMatch && searchMatch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle tag selection
  const handleTagClick = (tag) => {
    if (activeTag === tag) {
      setActiveTag(null); // Deselect if already active
    } else {
      setActiveTag(tag);
      setCurrentPage(1); // Reset to first page
    }
  };

  // FIXED: Better loading state
  if (loading) {
    return (
      <div className="blog-page">
        <div className="container">
          <h1 className="page-title">Surunga Medicine & Clinic Blog</h1>
          <div className="loading-spinner">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  // Display a message if there's an error
  if (error) {
    return (
      <div className="blog-page">
        <div className="container">
          <h1 className="page-title">Surunga Medicine & Clinic Blog</h1>
          <div className="error-message">
            <h2>Error Loading Blog</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display a message if no blog posts are available
  if (!loading && blogPosts.length === 0) {
    return (
      <div className="blog-page">
        <div className="container">
          <h1 className="page-title">Surunga Medicine & Clinic Blog</h1>
          
          <div className="no-posts-message">
            <h2>No blog posts available yet</h2>
            <p>To add blog posts, create markdown files in your <code>/public/blog/post</code> directory.</p>
            <p>Each blog post should have the following format:</p>
            
            <pre className="code-sample">
{`---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
category: "Category Name"
excerpt: "A brief summary of your post"
coverImage: "/images/your-image.jpg"
tags: ["tag1", "tag2", "tag3"]
---

# Your Blog Post Title

Your content goes here in Markdown format.

## Subheading

More content...`}
            </pre>
            
            <p>You also need to create an index.json file in your <code>/public/blog</code> directory with the following format:</p>
            
            <pre className="code-sample">
{`[
  { "filename": "blog-post-1.md" },
  { "filename": "blog-post-2.md" },
  { "filename": "another-post.md" }
]`}
            </pre>

            <p>This structure allows your blog to load markdown files directly from your public directory.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <h1 className="page-title">Surunga Medicine & Clinic Blog</h1>
          <p className="page-description">
            Latest insights, medical advice, and health tips from our experts
          </p>
          
          {/* Search bar */}
          <div className="blog-search">
            <input
              type="text"
              className="search-input"
              placeholder="     Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <div className="container blog-container">
        <>
          {/* Main content area */}
          <div className="blog-main-content">
            {/* Category filter */}
            {categories.length > 1 && (
              <div className="blog-filter">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            
            {/* Blog posts grid */}
            {currentPosts.length > 0 ? (
              <div className="blog-grid">
                {currentPosts.map((post, index) => (
                  <div 
                    className={`blog-card ${index === 0 && currentPage === 1 && activeCategory === 'All' && !searchTerm && !activeTag ? 'featured' : ''}`}
                    key={post.id}
                  >
                    {post.coverImage && (
                      <div className="blog-image">
                        <LazyImage src={post.coverImage} alt={post.title} />
                      </div>
                    )}
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-date">
                          {format(new Date(post.date), 'MMMM dd, yyyy')}
                        </span>
                        {post.category && (
                          <span className="blog-category">{post.category}</span>
                        )}
                      </div>
                      <h2 className="blog-title">{post.title}</h2>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <div className="blog-footer">
                        <Link to={`/Blog/${post.id}`} className="read-more">
                          Read More
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                        {post.author && (
                          <span className="blog-author">
                            By {post.author}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria.</p>
                <button 
                  className="clear-filters-btn" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                    setActiveTag(null);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  
                  // Show limited page numbers for better UX
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  
                  // Show ellipsis for skipped pages
                  if (
                    (pageNumber === currentPage - 2 && pageNumber > 2) ||
                    (pageNumber === currentPage + 2 && pageNumber < totalPages - 1)
                  ) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  
                  return null;
                })}
                
                <button 
                  className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="blog-sidebar">
            {/* Recent Posts */}
            <div className="sidebar-widget recent-posts">
              <h3 className="widget-title">Recent Articles</h3>
              <ul className="recent-posts-list">
                {recentPosts.map(post => (
                  <li key={post.id} className="recent-post-item">
                    <Link to={`/Blog/${post.id}`} className="recent-post-link">
                      <div className="recent-post-image">
                        {post.coverImage ? (
                          <LazyImage src={post.coverImage} alt={post.title} />
                        ) : (
                          <div className="placeholder-image">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <path d="M21 15l-5-5L5 21"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="recent-post-info">
                        <h4 className="recent-post-title">{post.title}</h4>
                        <span className="recent-post-date">
                          {format(new Date(post.date), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tags */}
            {sortedTags.length > 0 && (
              <div className="sidebar-widget tags-widget">
                <h3 className="widget-title">Popular Tags</h3>
                <div className="tags-cloud">
                  {sortedTags.map(tag => (
                    <button
                      key={tag}
                      className={`tag-button ${activeTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag} 
                      <span className="tag-count">{tagCounts[tag]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Categories widget */}
            {categories.length > 2 && ( // More than just "All" and one category
              <div className="sidebar-widget categories-widget">
                <h3 className="widget-title">Categories</h3>
                <ul className="categories-list">
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <li key={category} className="category-item">
                      <button
                        className={`category-link ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(category);
                          setCurrentPage(1);
                        }}
                      >
                        {category}
                        <span className="category-count">
                          {blogPosts.filter(post => post.category === category).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Health Tip Widget */}
            <div className="sidebar-widget health-tip-widget">
              <h3 className="widget-title">Health Tip</h3>
              <div className="health-tip">
                <div className="health-tip-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <p>Staying hydrated improves energy levels, brain function, and overall health. Aim to drink at least 8 glasses of water daily.</p>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Blog;