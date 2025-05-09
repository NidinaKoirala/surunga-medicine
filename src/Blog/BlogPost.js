// src/pages/BlogPost.js - Update for layout with TOC on left
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { getBlogPostById, getAllBlogPosts } from '../utils/blogUtils';
import './BlogPost.css';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const [tableOfContents, setTableOfContents] = useState([]);
  const contentRef = useRef(null);
  
  // Function to handle going back to the blog with page refresh
  const handleBackToBlog = (e) => {
    e.preventDefault();
    // Navigate to blog with a full page reload
    window.location.href = '/Blog';
  };
  
  // Fetch blog post and related posts
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch the current post
        const postData = await getBlogPostById(id);
        
        if (!postData) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }
        
        setPost(postData);
        
        // Extract headings for table of contents
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const headings = [];
        let match;
        
        while ((match = headingRegex.exec(postData.content)) !== null) {
          const level = match[1].length;
          const text = match[2];
          const headingId = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
          
          headings.push({
            id: headingId,
            text,
            level
          });
        }
        
        setTableOfContents(headings);
        
        // Fetch all posts to find related and recommended ones
        const allPosts = await getAllBlogPosts();
        
        // Filter for related posts based on category or tags
        const related = allPosts
          .filter(p => 
            p.id !== postData.id && 
            (p.category === postData.category || 
             (p.tags && postData.tags && 
              p.tags.some(tag => postData.tags.includes(tag))))
          )
          .slice(0, 3);
        
        setRelatedPosts(related);
        
        // Get recommended posts (different from related posts)
        // We'll get the most recent posts that aren't already in related posts
        const relatedIds = related.map(p => p.id);
        const recommended = allPosts
          .filter(p => p.id !== postData.id && !relatedIds.includes(p.id))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        
        setRecommendedPosts(recommended);
        
        setError(null);
        
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
    
    fetchData();
    
  }, [id, navigate]);
  
  useEffect(() => {
    // Set up scroll event listener for reading progress and active heading
    const handleScroll = () => {
      // Calculate reading progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      
      // Determine active heading
      if (contentRef.current) {
        const headingElements = contentRef.current.querySelectorAll('h1, h2, h3');
        
        for (let i = headingElements.length - 1; i >= 0; i--) {
          const element = headingElements[i];
          const rect = element.getBoundingClientRect();
          
          if (rect.top <= 100) {
            const id = element.id;
            setActiveHeading(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to render custom markdown with heading IDs
  const customMarkdownRenderer = {
    h1: ({ node, ...props }) => {
      const id = props.children && props.children[0] ? props.children[0].toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') : '';
      // Add aria-hidden span with content to satisfy ESLint
      return <h1 id={id} {...props}>{props.children || <span aria-hidden="true">.</span>}</h1>;
    },
    h2: ({ node, ...props }) => {
      const id = props.children && props.children[0] ? props.children[0].toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') : '';
      // Add aria-hidden span with content to satisfy ESLint
      return <h2 id={id} {...props}>{props.children || <span aria-hidden="true">.</span>}</h2>;
    },
    h3: ({ node, ...props }) => {
      const id = props.children && props.children[0] ? props.children[0].toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') : '';
      // Add aria-hidden span with content to satisfy ESLint
      return <h3 id={id} {...props}>{props.children || <span aria-hidden="true">.</span>}</h3>;
    }
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading-spinner">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-message">
            <h2>{error}</h2>
            <p>The blog post you're looking for might not exist or there was an error loading it.</p>
            <a href="/Blog" className="back-to-blog" onClick={handleBackToBlog}>
              &larr; Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="error-message">
            <h2>Blog Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been removed.</p>
            <a href="/Blog" className="back-to-blog" onClick={handleBackToBlog}>
              &larr; Back to Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Reading progress bar */}
      <div className="reading-progress-container">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      {/* Blog Post Header */}
      <div className="blog-post-header">
        <div className="container">
          <a href="/Blog" className="back-to-blog" onClick={handleBackToBlog}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Blog
          </a>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="post-meta-main">
              {post.author && (
                <div className="post-author">
                  <div className="author-avatar-small">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random`} alt={post.author} />
                  </div>
                  <span>By {post.author}</span>
                </div>
              )}
              <span className="post-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </span>
            </div>
            <div className="post-meta-category">
              {post.category && (
                <span className="post-category">{post.category}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container blog-post-container">
        {/* Table of contents - now on the left */}
        {tableOfContents.length > 0 && (
          <div className="table-of-contents">
            <h3 className="toc-title">Table of Contents</h3>
            <ul className="toc-list">
              {tableOfContents.map(heading => (
                <li key={heading.id} className="toc-item">
                  <a 
                    href={`#${heading.id}`}
                    className={`toc-link level-${heading.level} ${activeHeading === heading.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Tags Section in Sidebar */}
            {post.tags && post.tags.length > 0 && (
              <div className="sidebar-widget tags-widget">
                <h3 className="widget-title">Tags</h3>
                <div className="post-tags-cloud">
                  {post.tags.map(tag => (
                    <Link key={tag} className="post-tag" to={`/Blog?tag=${tag}`}>
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Share Section in Sidebar */}
            <div className="sidebar-widget share-widget">
              <h3 className="widget-title">Share Article</h3>
              <div className="share-buttons-vertical">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-button-large share-facebook" aria-label="Share on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="share-button-large share-twitter" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                  </svg>
                  <span>Twitter</span>
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="share-button-large share-linkedin" aria-label="Share on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content - now on the right */}
        <div className="post-content-container">
          {/* Cover image */}
          {post.coverImage && (
            <div className="post-cover-image">
              <img src={post.coverImage} alt={post.title} />
            </div>
          )}
          
          {/* Article content */}
          <article className="blog-post">
            <div className="post-content" ref={contentRef}>
              <ReactMarkdown components={customMarkdownRenderer}>
                {post.content}
              </ReactMarkdown>
            </div>
            
            {/* Mobile Tags (visible only on mobile) */}
            {post.tags && post.tags.length > 0 && (
              <div className="post-tags mobile-only">
                <strong className="tags-label">Tags:</strong>
                {post.tags.map(tag => (
                  <Link key={tag} to={`/Blog?tag=${tag}`} className="post-tag">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Mobile Share Buttons (visible only on mobile) */}
            <div className="share-section mobile-only">
              <span className="share-title">Share this article:</span>
              <div className="share-buttons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-button share-facebook" aria-label="Share on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="share-button share-twitter" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                  </svg>
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="share-button share-linkedin" aria-label="Share on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
          
          {/* Author section */}
          {post.author && (
            <div className="author-section">
              <div className="author-avatar">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=random`} alt={post.author} />
              </div>
              <div className="author-info">
                <h3 className="author-name">{post.author}</h3>
                <p className="author-bio">Medical specialist at Surunga Medicine & Clinic with expertise in {post.category || 'healthcare'}. Passionate about educating patients and improving healthcare accessibility.</p>
                <div className="author-social">
                  <a href="https://example.com/author-profile" className="social-link" aria-label="Author's Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Posts You May Like section - now above Related Posts */}
      {recommendedPosts.length > 0 && (
        <div className="recommended-section">
          <div className="container">
            <h2 className="section-title">Posts You May Like</h2>
            <div className="recommended-grid">
              {recommendedPosts.map(post => (
                <Link to={`/Blog/${post.id}`} className="recommended-post" key={post.id}>
                  <div className="recommended-post-image">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
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
                  <div className="recommended-post-content">
                    <h3 className="recommended-post-title">{post.title}</h3>
                    <p className="recommended-post-excerpt">{post.excerpt}</p>
                    <div className="recommended-post-meta">
                      <span className="recommended-post-date">
                        {format(new Date(post.date), 'MMM dd, yyyy')}
                      </span>
                      {post.author && (
                        <span className="recommended-post-author">By {post.author}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Related posts section */}
      {relatedPosts.length > 0 && (
        <div className="related-section">
          <div className="container">
            <h2 className="section-title">Related Articles</h2>
            <div className="related-grid">
              {relatedPosts.map(relatedPost => (
                <Link to={`/Blog/${relatedPost.id}`} className="related-post" key={relatedPost.id}>
                  {relatedPost.coverImage && (
                    <div className="related-post-image">
                      <img src={relatedPost.coverImage} alt={relatedPost.title} />
                    </div>
                  )}
                  <div className="related-post-content">
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                    <div className="related-post-meta">
                      <span className="related-post-date">
                        {format(new Date(relatedPost.date), 'MMM dd, yyyy')}
                      </span>
                      {relatedPost.category && (
                        <span className="related-post-category">{relatedPost.category}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;