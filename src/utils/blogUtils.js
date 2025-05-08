// src/utils/blogUtils.js

/**
 * Simple front matter parser for markdown files
 * This is a lightweight alternative to gray-matter that works in the browser
 * @param {string} markdown - The markdown content with front matter
 * @returns {Object} Object with data and content properties
 */
function parseFrontMatter(markdown) {
    // Default return structure
    const result = {
      data: {},
      content: markdown
    };
  
    // Check if the markdown has front matter
    if (!markdown.startsWith('---')) {
      return result;
    }
  
    try {
      // Find the closing front matter delimiter
      const endOfFrontMatter = markdown.indexOf('---', 3);
      if (endOfFrontMatter === -1) {
        return result;
      }
  
      // Extract the front matter and content
      const frontMatterStr = markdown.substring(3, endOfFrontMatter).trim();
      const content = markdown.substring(endOfFrontMatter + 3).trim();
  
      // Parse the front matter
      const frontMatterLines = frontMatterStr.split('\n');
      const data = {};
  
      frontMatterLines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();
  
          // Handle quoted strings
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          }
  
          // Handle arrays (e.g., tags: ["tag1", "tag2"])
          if (value.startsWith('[') && value.endsWith(']')) {
            try {
              // Parse arrays safely
              value = value.replace(/'/g, '"'); // Replace single quotes with double quotes for JSON parsing
              value = JSON.parse(value);
            } catch (e) {
              // If parsing fails, keep as string
              value = value.substring(1, value.length - 1).split(',').map(tag => tag.trim());
            }
          }
  
          data[key] = value;
        }
      });
  
      return {
        data,
        content
      };
    } catch (error) {
      console.error('Error parsing front matter:', error);
      return result;
    }
  }
  
  // Cache for blog posts to avoid re-fetching
  let blogPostsCache = null;
  let lastCacheTime = 0;
  const CACHE_VALIDITY_MS = 5 * 60 * 1000; // 5 minutes
  
  /**
   * Get all blog posts by fetching markdown files from the /blog/post directory
   * @returns {Promise<Array>} Promise resolving to array of blog post objects
   */
  export async function getAllBlogPosts() {
    // Use cache if available and not expired
    const now = Date.now();
    if (blogPostsCache && (now - lastCacheTime < CACHE_VALIDITY_MS)) {
      return blogPostsCache;
    }
  
    try {
      // Fetch the index of blog posts (this should be generated at build time or maintained manually)
      // For local development, you can place this in the public folder
      const response = await fetch('/blog/index.json');
      
      if (!response.ok) {
        console.error('Failed to fetch blog index:', response.statusText);
        return [];
      }
      
      const blogIndex = await response.json();
      
      // Fetch each blog post markdown file
      const postsPromises = blogIndex.map(async (postInfo) => {
        try {
          const postResponse = await fetch(`/blog/post/${postInfo.filename}`);
          
          if (!postResponse.ok) {
            console.error(`Failed to fetch blog post ${postInfo.filename}:`, postResponse.statusText);
            return null;
          }
          
          const markdown = await postResponse.text();
          
          // Parse front matter and content
          const { data: frontmatter, content } = parseFrontMatter(markdown);
          
          // Extract the ID from the filename (removing the .md)
          const id = postInfo.filename.replace(/\.md$/, '');
          
          return {
            id,
            ...frontmatter,
            content
          };
        } catch (error) {
          console.error(`Error processing blog post ${postInfo.filename}:`, error);
          return null;
        }
      });
      
      // Wait for all posts to be fetched and filter out null values (failed fetches)
      const posts = (await Promise.all(postsPromises)).filter(Boolean);
      
      // Sort posts by date (newest first)
      const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Update cache
      blogPostsCache = sortedPosts;
      lastCacheTime = now;
      
      return sortedPosts;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      return [];
    }
  }
  
  /**
   * Get a single blog post by ID
   * @param {string} id - The blog post ID
   * @returns {Promise<Object|null>} Promise resolving to the blog post object or null if not found
   */
  export async function getBlogPostById(id) {
    try {
      // Try to get from cache first
      if (blogPostsCache) {
        const cachedPost = blogPostsCache.find(post => post.id === id);
        if (cachedPost) {
          return cachedPost;
        }
      }
  
      // If not in cache, fetch the specific post
      const response = await fetch(`/blog/post/${id}.md`);
      
      if (!response.ok) {
        console.error(`Failed to fetch blog post ${id}:`, response.statusText);
        return null;
      }
      
      const markdown = await response.text();
      
      // Parse front matter and content
      const { data: frontmatter, content } = parseFrontMatter(markdown);
      
      return {
        id,
        ...frontmatter,
        content
      };
    } catch (error) {
      console.error(`Error loading blog post ${id}:`, error);
      return null;
    }
  }
  
  // Helper function to generate the blog index file (for development)
  export async function generateBlogIndex() {
    try {
      // This function would typically be run at build time or on a server
      // For browser development, we'll simulate it by checking for existing markdown files
      const fileNames = [
        'healthy-heart-tips.md',
        'understanding-preventive-healthcare.md',
        'covid-latest-research.md',
        // Add more filenames as they're created
      ];
      
      const index = fileNames.map(filename => ({ filename }));
      
      // In a real application, you would write this to a file
      console.log('Blog index generated:', index);
      console.log('JSON:', JSON.stringify(index, null, 2));
      
      return index;
    } catch (error) {
      console.error('Error generating blog index:', error);
      return [];
    }
  }
  
  export function preloadImages(imageUrls) {
    if (!imageUrls || !Array.isArray(imageUrls)) return;
    
    imageUrls.forEach(url => {
      if (url && typeof url === 'string') {
        const img = new Image();
        img.src = url;
      }
    });
  }
  // Add this to window for easy access during development
  if (typeof window !== 'undefined') {
    window.blogUtils = { getAllBlogPosts, getBlogPostById, generateBlogIndex };
  }