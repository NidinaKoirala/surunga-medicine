// Service for managing blog posts in localStorage

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
          
          // Add sample blog posts
          const sampleBlogs = [
            {
              title: "10 Tips for Better Heart Health",
              category: "Preventive Care",
              tags: ["Heart Health", "Prevention", "Lifestyle"],
              image: "https://source.unsplash.com/random/800x600/?heart",
              author: "Dr. Sarah Johnson",
              excerpt: "Discover simple lifestyle changes that can significantly improve your heart health and reduce your risk of cardiovascular disease.",
              content: "# 10 Tips for Better Heart Health\n\n## Introduction\nHeart disease is the leading cause of death worldwide, but many cases are preventable with lifestyle changes. Here are 10 evidence-based tips to keep your heart healthy and strong.\n\n## 1. Stay Active\nRegular physical activity is one of the best things you can do for your heart. Aim for at least 150 minutes of moderate exercise per week.\n\n## 2. Eat a Heart-Healthy Diet\nFocus on fruits, vegetables, whole grains, lean proteins, and healthy fats like those found in olive oil and avocados.\n\n## 3. Maintain a Healthy Weight\nExcess weight puts strain on your heart. Even modest weight loss can significantly reduce your risk.\n\n## 4. Don't Smoke\nSmoking damages your blood vessels and greatly increases your risk of heart disease. Quitting at any age can reduce your risk.\n\n## 5. Limit Alcohol\nIf you drink, do so in moderation – generally one drink per day for women and two for men.\n\n## 6. Manage Stress\nChronic stress contributes to heart disease. Try relaxation techniques like meditation, yoga, or deep breathing.\n\n## 7. Get Regular Check-ups\nRegular screenings can catch risk factors like high blood pressure or cholesterol before they cause problems.\n\n## 8. Get Adequate Sleep\nAim for 7-9 hours of quality sleep per night. Poor sleep is linked to increased heart disease risk.\n\n## 9. Control Blood Sugar\nHigh blood sugar can damage blood vessels and the nerves that control your heart.\n\n## 10. Know Your Family History\nGenetics plays a role in heart disease risk. Knowing your family history can help you and your doctor create a prevention plan.\n\n## Conclusion\nTaking care of your heart doesn't require major life changes. Small, consistent steps can have a big impact on your heart health over time.\n\n*This article is for informational purposes only and not intended as medical advice.*"
            },
            {
              title: "Understanding Mental Health in Today's World",
              category: "Mental Health",
              tags: ["Mental Health", "Wellness", "Self-Care"],
              image: "https://source.unsplash.com/random/800x600/?mind",
              author: "Dr. Michael Chen",
              excerpt: "Mental health awareness has grown significantly in recent years. Learn about common conditions and strategies for maintaining good mental well-being.",
              content: "# Understanding Mental Health in Today's World\n\n## Introduction\nMental health is an essential component of overall well-being, yet it has historically been overlooked or stigmatized. Today, we're making progress in understanding, treating, and talking about mental health conditions.\n\n## Common Mental Health Conditions\n\n### Anxiety Disorders\nAnxiety disorders affect approximately 19% of adults annually. They include generalized anxiety disorder, panic disorder, and various phobias.\n\n### Depression\nDepression is more than just feeling sad; it's a persistent condition that affects how you feel, think, and handle daily activities.\n\n### Bipolar Disorder\nCharacterized by unusual shifts in mood, energy, and activity levels, from manic episodes to depressive lows.\n\n## Factors Affecting Mental Health\n\n### Genetics\nFamily history plays a significant role in mental health risk.\n\n### Environment\nTrauma, stress, and other environmental factors can trigger or worsen mental health conditions.\n\n### Lifestyle\nSleep, diet, exercise, and substance use all impact mental well-being.\n\n## Strategies for Better Mental Health\n\n### Seek Professional Help\nTherapy, counseling, and medication can be highly effective for treating mental health conditions.\n\n### Practice Self-Care\nRegular exercise, adequate sleep, and healthy eating habits support good mental health.\n\n### Build Strong Relationships\nSocial connections provide emotional support and reduce feelings of isolation.\n\n### Mindfulness and Meditation\nThese practices can reduce stress and improve emotional regulation.\n\n## Breaking the Stigma\nOne of the biggest barriers to mental health treatment is stigma. By openly discussing mental health, we can create a more supportive environment for those struggling.\n\n## Conclusion\nMental health is as important as physical health. With proper understanding, prevention, and treatment, we can all work toward better mental well-being.\n\n*This article is for informational purposes only and not intended as medical advice.*"
            },
            {
              title: "The Benefits of Regular Exercise for Overall Health",
              category: "Fitness",
              tags: ["Exercise", "Fitness", "Wellness"],
              image: "https://source.unsplash.com/random/800x600/?exercise",
              author: "Dr. Sarah Johnson",
              excerpt: "Regular physical activity provides numerous health benefits beyond just weight management. Learn how exercise impacts your body and mind.",
              content: "# The Benefits of Regular Exercise for Overall Health\n\n## Introduction\nRegular physical activity is one of the most important things you can do for your health. It can help control weight, reduce risk of disease, strengthen bones and muscles, and improve mental health and mood.\n\n## Physical Benefits\n\n### Weight Management\nExercise helps prevent excess weight gain and helps maintain weight loss by increasing metabolic rate and burning calories.\n\n### Reduced Disease Risk\nRegular activity can help prevent or manage a wide range of health problems including stroke, metabolic syndrome, type 2 diabetes, depression, anxiety, and many types of cancer.\n\n### Stronger Bones and Muscles\nAs we age, we tend to lose muscle mass and function. Regular exercise helps slow this loss and maintains strength and mobility.\n\n### Improved Cardiovascular Health\nExercise strengthens your heart and improves circulation, which lowers your risk of heart diseases.\n\n## Mental Benefits\n\n### Improved Mood\nPhysical activity stimulates the production of endorphins, which help reduce feelings of pain and trigger positive feelings.\n\n### Reduced Stress and Anxiety\nRegular exercise can decrease stress levels and help manage symptoms of anxiety and depression.\n\n### Better Sleep\nRegular physical activity can help you fall asleep faster, get better sleep, and deepen your sleep.\n\n### Increased Energy\nExercise delivers oxygen and nutrients to your tissues, helping your cardiovascular system work more efficiently.\n\n## Getting Started\n\n### Finding Your Exercise Type\nThe best exercise is one you enjoy and will continue doing. This might be walking, swimming, cycling, or group fitness classes.\n\n### Setting Realistic Goals\nStart small and gradually increase intensity and duration to prevent injury and burnout.\n\n### Making It a Habit\nConsistency is key. Schedule exercise as you would any important appointment.\n\n## Conclusion\nThe benefits of regular physical activity extend far beyond weight management, affecting nearly every aspect of your health and well-being. Even small amounts of activity are better than none.\n\n*This article is for informational purposes only and not intended as medical advice.*"
            }
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
};

export default BlogLocalStorage;