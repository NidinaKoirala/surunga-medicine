// Service for managing blog posts in localStorage with Export/Import functionality

// Storage key for blog posts
const BLOGS_STORAGE_KEY = "surunga_medicine_blog_posts";

// Initialize blog storage in localStorage
const initBlogStorage = () => {
  if (!localStorage.getItem(BLOGS_STORAGE_KEY)) {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
  }
};

// Process tags consistently (handle both string and array cases)
const processTagsConsistently = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  } else if (Array.isArray(tags)) {
    return tags.map(tag => tag.trim()).filter(tag => tag);
  } else {
    return [];
  }
};

// Format a blog post to ensure consistent data structure
const formatBlogPost = (blogData) => {
  // Generate ID if not provided
  const id = blogData.id || `blog_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  
  // Generate date if not provided
  const date = blogData.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Estimate read time if not provided
  const readTime = blogData.readTime || `${Math.max(1, Math.ceil(blogData.content.split(/\s+/).length / 200))} min read`;
  
  // Make sure tags is always an array
  const tags = processTagsConsistently(blogData.tags);
  
  return {
    id,
    title: blogData.title,
    content: blogData.content,
    excerpt: blogData.excerpt,
    author: blogData.author || 'Dr. Sarah Johnson',
    category: blogData.category,
    tags,
    image: blogData.image || '',
    date,
    readTime,
    createdAt: blogData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

const BlogLocalStorage = {
  // Initialize the blog storage with sample data if needed
  initialize(populateSampleData = false) {
    try {
      initBlogStorage();
      
      // Check if we need to add sample data and the storage is empty
      if (populateSampleData) {
        const blogs = this.getAllBlogs();
        
        if (blogs.length === 0) {
          console.log('Initializing blog storage with sample data');
          
          // Add sample blog posts (omitted for brevity)
          // ...
          
          console.log('Sample blog data initialized successfully');
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing blog storage:', error);
      return false;
    }
  },
  
  // Create a new blog post
  createBlog(blogData) {
    try {
      initBlogStorage();
      
      // Get current blogs
      const blogs = JSON.parse(localStorage.getItem(BLOGS_STORAGE_KEY) || "[]");
      
      // Format and add new blog
      const newBlog = formatBlogPost(blogData);
      blogs.unshift(newBlog); // Add to beginning of array
      
      // Save back to localStorage
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
      
      console.log('Blog created successfully:', newBlog);
      return newBlog;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },
  
  // Get all blog posts
  getAllBlogs() {
    try {
      initBlogStorage();
      return JSON.parse(localStorage.getItem(BLOGS_STORAGE_KEY) || "[]");
    } catch (error) {
      console.error('Error getting blogs:', error);
      return [];
    }
  },
  
  // Get a specific blog post by ID
  getBlogById(id) {
    try {
      const blogs = this.getAllBlogs();
      return blogs.find(blog => blog.id === id) || null;
    } catch (error) {
      console.error(`Error getting blog with ID ${id}:`, error);
      return null;
    }
  },
  
  // Update an existing blog post
  updateBlog(id, blogData) {
    try {
      const blogs = this.getAllBlogs();
      const index = blogs.findIndex(blog => blog.id === id);
      
      if (index === -1) {
        throw new Error(`Blog with ID ${id} not found`);
      }
      
      // Preserve the original id, createdAt
      const updatedBlog = formatBlogPost({
        ...blogData,
        id,
        createdAt: blogs[index].createdAt
      });
      
      // Update the blog
      blogs[index] = updatedBlog;
      
      // Save back to localStorage
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
      
      console.log('Blog updated successfully:', updatedBlog);
      return updatedBlog;
    } catch (error) {
      console.error(`Error updating blog with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a blog post
  deleteBlog(id) {
    try {
      const blogs = this.getAllBlogs();
      const filteredBlogs = blogs.filter(blog => blog.id !== id);
      
      if (filteredBlogs.length === blogs.length) {
        throw new Error(`Blog with ID ${id} not found`);
      }
      
      // Save back to localStorage
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(filteredBlogs));
      
      console.log(`Blog with ID ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Export blogs to a JSON file
  exportBlogs() {
    try {
      const blogs = this.getAllBlogs();
      const blogsJSON = JSON.stringify(blogs, null, 2);
      
      // Create a blob and generate a download link
      const blob = new Blob([blogsJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      const filename = `blog_export_${date}.json`;
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
      
      return blogs.length;
    } catch (error) {
      console.error('Error exporting blogs:', error);
      throw error;
    }
  },
  
  // Import blogs from a JSON file
  async importBlogs(file) {
    try {
      // Read the file
      const text = await file.text();
      const importedBlogs = JSON.parse(text);
      
      if (!Array.isArray(importedBlogs)) {
        throw new Error('Invalid blog data format');
      }
      
      // Format each imported blog to ensure consistent structure
      const formattedBlogs = importedBlogs.map(blog => formatBlogPost(blog));
      
      // Save to localStorage
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(formattedBlogs));
      
      console.log(`Imported ${formattedBlogs.length} blogs successfully`);
      return formattedBlogs.length;
    } catch (error) {
      console.error('Error importing blogs:', error);
      throw error;
    }
  },
  
  // Other methods remain the same...
  
  // Get blogs by category, search blogs, etc.
  // (omitted for brevity)
};

// Initialize storage on load
initBlogStorage();

// Add a debug method
BlogLocalStorage.debugStorage = () => {
  console.log('Current blog posts in localStorage:', BlogLocalStorage.getAllBlogs());
};

export default BlogLocalStorage;