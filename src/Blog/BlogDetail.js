import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaArrowLeft, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterest } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import './Blog.css';
import BlogLocalStorage from './BlogLocalStorage';
import CloudinaryImageService from './CloudinaryImageService';

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);
    // We don't need processedContent anymore since we're using the custom img component
    // eslint-disable-next-line no-unused-vars
    const [processedContent, setProcessedContent] = useState('');
    
    // Load blog and related posts
    useEffect(() => {
        const loadBlog = () => {
            setLoading(true);
            
            try {
                // Initialize CloudinaryImageService
                CloudinaryImageService.initialize();
                
                // Get the blog with the given ID
                const foundBlog = BlogLocalStorage.getBlogById(id);
                
                if (foundBlog) {
                    setBlog(foundBlog);
                    
                    // Debug the images in the content
                    findImagesInContent(foundBlog.content);
                    
                    // Process content to replace image IDs with Cloudinary URLs
                    if (foundBlog.content) {
                        // We can either process the content here or handle it in the render with custom components
                        // Option 1: Process here (replace image IDs with URLs)
                        const processed = processMarkdownContent(foundBlog.content);
                        setProcessedContent(processed);
                    }
                    
                    // Get related posts (same category, excluding current post)
                    const allBlogs = BlogLocalStorage.getAllBlogs();
                    const related = allBlogs
                        .filter(b => b.id !== id && b.category === foundBlog.category)
                        .slice(0, 3);
                    
                    setRelatedPosts(related);
                }
            } catch (error) {
                console.error('Error loading blog:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadBlog();
    }, [id]);
    
    // Helper function to find images in content
    const findImagesInContent = (content) => {
        if (!content) return;
        
        console.log('Searching for images in content...');
        const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let foundImages = 0;
        
        while ((match = imageRegex.exec(content)) !== null) {
            foundImages++;
            const [fullMatch, alt, src] = match;
            console.log(`Found image ${foundImages}:`, fullMatch);
            console.log(`  Alt text: ${alt}`);
            console.log(`  Source: ${src}`);
            
            if (src.startsWith('img_')) {
                const url = CloudinaryImageService.getImageUrl(src);
                console.log(`  Resolved URL: ${url || 'Not found'}`);
            }
        }
        
        if (foundImages === 0) {
            console.log('No images found in content');
        } else {
            console.log(`Found ${foundImages} images in content`);
        }
    };
    
    // Process markdown content to replace image IDs with Cloudinary URLs
    const processMarkdownContent = (markdown) => {
        if (!markdown) return '';
        
        console.log('Processing markdown content...');
        
        // Get all available images for debugging
        const imageStorage = CloudinaryImageService.debugStorage();
        console.log('Available images in storage:', Object.keys(imageStorage));
        
        // First, let's detect any image tags in the markdown
        const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
        let imageMatch;
        let hasImages = false;
        
        console.log('Detecting images in markdown:');
        while ((imageMatch = imageRegex.exec(markdown)) !== null) {
            hasImages = true;
            const [fullMatch, altText, src] = imageMatch;
            console.log(`Found image: ${fullMatch}`);
            console.log(`  Alt text: ${altText}`);
            console.log(`  Source: ${src}`);
        }
        
        if (!hasImages) {
            console.log('No images found in markdown');
        }
        
        // Now replace image IDs with URLs
        // This regex specifically looks for image syntax with a source that starts with "img_"
        const processedMarkdown = markdown.replace(/!\[([^\]]+)\]\((img_[^)]+)\)/g, (match, altText, imageId) => {
            console.log(`Processing image match: ${match}`);
            
            // Try to get the URL from CloudinaryImageService
            const imageUrl = CloudinaryImageService.getImageUrl(imageId);
            
            if (imageUrl) {
                console.log(`✓ Found URL for ${imageId}: ${imageUrl}`);
                
                // Optional: resize the image using Cloudinary transformations
                const resizedUrl = CloudinaryImageService.getImageUrlWithTransformations(imageUrl, {
                    width: 800,
                    height: 0,
                    crop: 'limit'
                });
                
                return `![${altText}](${resizedUrl || imageUrl})`;
            } else {
                console.warn(`✗ No URL found for image ID: ${imageId}`);
                
                // Try to fix the image on the fly
                try {
                    const allImages = JSON.parse(localStorage.getItem("surunga_medicine_blog_cloudinary_images") || "{}");
                    const imageData = allImages[imageId];
                    
                    if (imageData) {
                        console.log(`Found image metadata but URL is missing:`, imageData);
                        
                        // If we have cloudinaryId but no URL, we can construct one
                        if (imageData.cloudinaryId) {
                            const constructedUrl = `https://res.cloudinary.com/dp6z8e3zf/image/upload/${imageData.cloudinaryId}`;
                            console.log(`Constructed URL from cloudinaryId: ${constructedUrl}`);
                            return `![${altText}](${constructedUrl})`;
                        }
                    }
                } catch (error) {
                    console.error('Error trying to fix image on the fly:', error);
                }
                
                return match; // Keep original if we can't fix it
            }
        });
        
        return processedMarkdown;
    };
    
    // Get image URL for the featured image (could be Cloudinary or external)
    const getFeaturedImageUrl = () => {
        if (!blog || !blog.image) return '';
        
        if (CloudinaryImageService.isImageId(blog.image)) {
            // Get the Cloudinary URL with transformations for a better header image
            const imageUrl = CloudinaryImageService.getImageUrl(blog.image);
            console.log(`Featured image URL for ${blog.image}:`, imageUrl);
            
            if (imageUrl) {
                // Apply transformations for a better header image (higher quality, good dimensions)
                return CloudinaryImageService.getImageUrlWithTransformations(imageUrl, {
                    width: 1200,
                    height: 600,
                    crop: 'fill',
                    quality: 'auto:best'
                });
            }
            
            return imageUrl;
        }
        
        return blog.image;
    };
    
    if (loading) {
        return (
            <div className="blog-detail-loader">
                <div className="spinner"></div>
                <p>Loading article...</p>
            </div>
        );
    }
    
    if (!blog) {
        return (
            <div className="blog-not-found">
                <h2>Blog Not Found</h2>
                <p>Sorry, the blog post you are looking for does not exist.</p>
                <Link to="/Blog" className="btn-back">
                    <FaArrowLeft /> Back to Blog
                </Link>
            </div>
        );
    }
    
    return (
        <section className="blog-detail-section">
            <div className="blog-detail-header" style={{backgroundImage: `url(${getFeaturedImageUrl()})`}}>
                <div className="container">
                    <div className="blog-detail-header-content">
                        <div className="blog-category">
                            <span>{blog.category}</span>
                        </div>
                        <h1>{blog.title}</h1>
                        <div className="blog-meta">
                            <span><FaUser /> {blog.author}</span>
                            <span><FaCalendarAlt /> {blog.date}</span>
                            <span><FaClock /> {blog.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container blog-detail-container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="blog-detail-content">
                            <div className="blog-tags">
                                {blog.tags && blog.tags.map((tag, index) => (
                                    <span key={index} className="blog-tag">
                                        <FaTag /> {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="blog-content-body">
                                <ReactMarkdown components={{
                                    // Custom component for images to control size
                                    img: ({node, ...props}) => {
                                        // Get the original src
                                        let src = props.src;
                                        
                                        // If it's an image ID, convert to URL
                                        if (src && src.startsWith('img_')) {
                                            const imageUrl = CloudinaryImageService.getImageUrl(src);
                                            if (imageUrl) {
                                                src = imageUrl;
                                            }
                                        }
                                        
                                        // Return the image with controlled dimensions
                                        return (
                                            <img 
                                                {...props} 
                                                src={src} 
                                                alt={props.alt || "Blog image"}
                                                className="blog-content-image"
                                                style={{
                                                    maxWidth: '100%', 
                                                    height: 'auto',
                                                    maxHeight: '500px',
                                                    margin: '20px auto',
                                                    display: 'block',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }} 
                                            />
                                        );
                                    }
                                }}>
                                    {blog.content}
                                </ReactMarkdown>
                            </div>
                            
                            <div className="blog-share">
                                <h4>Share This Article</h4>
                                <div className="social-share-buttons">
                                    <button className="social-button facebook">
                                        <FaFacebookF />
                                    </button>
                                    <button className="social-button twitter">
                                        <FaTwitter />
                                    </button>
                                    <button className="social-button linkedin">
                                        <FaLinkedinIn />
                                    </button>
                                    <button className="social-button pinterest">
                                        <FaPinterest />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="blog-author">
                                <div className="author-image">
                                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt={blog.author} />
                                </div>
                                <div className="author-content">
                                    <h3>{blog.author}</h3>
                                    <p>A board-certified physician specializing in healthcare. With years of clinical experience, they are passionate about empowering patients through health education and preventive care strategies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="blog-sidebar">
                            <div className="sidebar-widget">
                                <Link to="/Blog" className="btn-back">
                                    <FaArrowLeft /> Back to Blog
                                </Link>
                            </div>
                            
                            {relatedPosts.length > 0 && (
                                <div className="sidebar-widget related-posts-widget">
                                    <h3>Related Articles</h3>
                                    <div className="related-posts">
                                        {relatedPosts.map(post => {
                                            // Get proper image URL for related posts
                                            const postImageUrl = CloudinaryImageService.isImageId(post.image) 
                                                ? CloudinaryImageService.getImageUrl(post.image)
                                                : post.image;
                                                
                                            return (
                                                <div className="related-post" key={post.id}>
                                                    <div className="related-post-image">
                                                        <Link to={`/Blog/${post.id}`}>
                                                            <img src={postImageUrl} alt={post.title} />
                                                        </Link>
                                                        <div className="post-category">
                                                            <span>{post.category}</span>
                                                        </div>
                                                    </div>
                                                    <div className="related-post-content">
                                                        <h4>
                                                            <Link to={`/Blog/${post.id}`}>{post.title}</Link>
                                                        </h4>
                                                        <p>{post.excerpt && post.excerpt.substring(0, 80)}...</p>
                                                        <span className="post-date"><FaCalendarAlt /> {post.date}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            
                            <div className="sidebar-widget subscribe-widget">
                                <h3>Subscribe to Our Newsletter</h3>
                                <p>Get the latest health tips and updates delivered to your inbox.</p>
                                <form className="subscribe-form">
                                    <input type="email" placeholder="Your Email Address" required />
                                    <button type="submit" className="btn-subscribe">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {relatedPosts.length > 0 && (
                <div className="more-articles-section">
                    <div className="container">
                        <h2>More Articles You Might Like</h2>
                        <div className="row">
                            {relatedPosts.map(post => {
                                // Get proper image URL for related posts
                                const postImageUrl = CloudinaryImageService.isImageId(post.image) 
                                    ? CloudinaryImageService.getImageUrl(post.image)
                                    : post.image;
                                    
                                return (
                                    <div className="col-md-4" key={post.id}>
                                        <div className="article-card">
                                            <div className="article-image">
                                                <Link to={`/Blog/${post.id}`}>
                                                    <img src={postImageUrl} alt={post.title} />
                                                </Link>
                                                <div className="article-category">
                                                    <span>{post.category}</span>
                                                </div>
                                            </div>
                                            <div className="article-content">
                                                <h3>
                                                    <Link to={`/Blog/${post.id}`}>{post.title}</Link>
                                                </h3>
                                                <span className="article-date"><FaCalendarAlt /> {post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default BlogDetail;