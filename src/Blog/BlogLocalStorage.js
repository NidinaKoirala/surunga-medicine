// BlogLocalStorage.js with URL-based persistence
// This solution stores and retrieves blog data from the URL hash

// Storage key for blog posts in localStorage (for compatibility)
const BLOGS_STORAGE_KEY = "surunga_medicine_blog_posts";

// Initialize blog storage from URL hash or localStorage
const initBlogStorage = () => {
  try {
    // First, check the URL hash for compressed data
    const hashData = getDataFromHash();
    
    if (hashData && hashData.length > 0) {
      // We have data in the URL, use it and save to localStorage as backup
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(hashData));
      return;
    }
    
    // No data in URL, check localStorage
    if (!localStorage.getItem(BLOGS_STORAGE_KEY)) {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error initializing blog storage:', error);
    // Fallback to empty array
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
  }
};

// Process tags consistently
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

// Compress data for URL storage
const compressData = (data) => {
  try {
    // Convert to JSON string
    const jsonString = JSON.stringify(data);
    
    // Use built-in compression
    const compressed = btoa(unescape(encodeURIComponent(jsonString)));
    
    return compressed;
  } catch (error) {
    console.error('Error compressing data:', error);
    return '';
  }
};

// Decompress data from URL
const decompressData = (compressed) => {
  try {
    // Decompress
    const jsonString = decodeURIComponent(escape(atob(compressed)));
    
    // Parse JSON
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decompressing data:', error);
    return null;
  }
};

// Save data to URL hash
const saveDataToHash = (data) => {
  // Compress the data
  const compressed = compressData(data);
  
  // Update URL without reloading the page
  if (compressed) {
    // Only update if within reasonable size limits (browsers typically support ~2000 chars)
    if (compressed.length < 2000) {
      window.location.hash = `data=${compressed}`;
      return true;
    } else {
      console.warn('Data too large for URL storage, saved to localStorage only');
      return false;
    }
  }
  return false;
};

// Get data from URL hash
const getDataFromHash = () => {
  try {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#data=')) {
      const compressed = hash.substring(6); // Remove "#data="
      return decompressData(compressed);
    }
  } catch (error) {
    console.error('Error getting data from hash:', error);
  }
  return null;
};

const BlogLocalStorage = {
  // Initialize the blog storage
  initialize(populateSampleData = false) {
    try {
      initBlogStorage();
      
      // Check if we need to add sample data and the storage is empty
      if (populateSampleData) {
        const blogs = this.getAllBlogs();
        
        if (blogs.length === 0) {
          console.log('Initializing blog storage with sample data');
          
          // Add sample blog posts
          const sampleBlogs = [
            {
              title: "10 Tips for Better Heart Health",
              category: "Preventive Care",
              tags: ["Heart Health", "Prevention", "Lifestyle"],
              image: "https://source.unsplash.com/random/800x600/?heart",
              author: "Dr. Sarah Johnson",
              excerpt: "Discover simple lifestyle changes that can significantly improve your heart health and reduce your risk of cardiovascular disease.",
              content: "# 10 Tips for Better Heart Health\n\n## Introduction\nHeart disease is the leading cause of death worldwide, but many cases are preventable with lifestyle changes. Here are 10 evidence-based tips to keep your heart healthy and strong."
            },
            // Add more sample blogs if needed
          ];
          
          // Add each sample blog
          sampleBlogs.forEach(blog => this.createBlog(blog));
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
      
      // Save to URL for persistence
      saveDataToHash(blogs);
      
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
      
      // Save to URL for persistence
      saveDataToHash(blogs);
      
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
      
      // Save to URL for persistence
      saveDataToHash(filteredBlogs);
      
      console.log(`Blog with ID ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Export and import methods (still useful as backup)
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
      
      // Save to URL for persistence
      saveDataToHash(formattedBlogs);
      
      console.log(`Imported ${formattedBlogs.length} blogs successfully`);
      return formattedBlogs.length;
    } catch (error) {
      console.error('Error importing blogs:', error);
      throw error;
    }
  },
  
  // Get blog posts by category
  getBlogsByCategory(category) {
    try {
      const blogs = this.getAllBlogs();
      return blogs.filter(blog => blog.category === category);
    } catch (error) {
      console.error(`Error getting blogs with category ${category}:`, error);
      return [];
    }
  },
  
  // Search blogs by term (title, content, tags)
  searchBlogs(term) {
    try {
      if (!term) return this.getAllBlogs();
      
      const blogs = this.getAllBlogs();
      const searchTerm = term.toLowerCase();
      
      return blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.category.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error(`Error searching blogs with term "${term}":`, error);
      return [];
    }
  },
  
  // Get all unique categories
  getAllCategories() {
    try {
      const blogs = this.getAllBlogs();
      return [...new Set(blogs.map(blog => blog.category))];
    } catch (error) {
      console.error('Error getting all categories:', error);
      return [];
    }
  },
  
  // Get all unique tags
  getAllTags() {
    try {
      const blogs = this.getAllBlogs();
      return [...new Set(blogs.flatMap(blog => blog.tags))];
    } catch (error) {
      console.error('Error getting all tags:', error);
      return [];
    }
  },
  
  // Get all used image IDs (for cleanup)
  getAllUsedImageIds() {
    try {
      const blogs = this.getAllBlogs();
      const imageIds = new Set();
      
      // Get featured images
      blogs.forEach(blog => {
        if (blog.image && blog.image.startsWith('img_')) {
          imageIds.add(blog.image);
        }
      });
      
      // Get images from content
      const imageRegex = /!\[.*?\]\((img_[^)]+)\)/g;
      blogs.forEach(blog => {
        let match;
        while ((match = imageRegex.exec(blog.content)) !== null) {
          imageIds.add(match[1]);
        }
      });
      
      return [...imageIds];
    } catch (error) {
      console.error('Error getting all used image IDs:', error);
      return [];
    }
  }
};

// Initialize storage on load
initBlogStorage();

// Add a debug method
BlogLocalStorage.debugStorage = () => {
  console.log('Current blog posts in localStorage:', BlogLocalStorage.getAllBlogs());
  console.log('URL hash data:', getDataFromHash());
};

export default BlogLocalStorage;