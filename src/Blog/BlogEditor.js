import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaHeading, FaBold, FaItalic, FaListUl, FaListOl, FaLink, FaQuoteLeft, FaTable, FaCode, FaEye, FaSave, FaTimes, FaImage } from 'react-icons/fa';
import './BlogEditor.css';
import BlogLocalStorage from './BlogLocalStorage';
import AuthService from './AuthService';
import ImageUploader from './ImageUploader';
import CloudinaryImageService from './CloudinaryImageService';

function BlogEditor() {
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode
    const isEditMode = !!id;
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        tags: '',
        image: '',
        author: 'Dr. Sarah Johnson', // Default author
        excerpt: '',
        content: ''
    });
    
    const [previewMode, setPreviewMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    
    // Predefined template to help users get started
    const markdownTemplate = `# Your Title Here

## Introduction
Start with an engaging introduction about your topic.

## Main Content
Elaborate on your main points here.

### Subheading 1
- Point 1
- Point 2
- Point 3

### Subheading 2
1. Step 1
2. Step 2
3. Step 3

## Include an Image
![Image Description](image-url-here)

## Add a Quote
> Important quote or takeaway point here.

## Create a Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |

## Conclusion
Summarize your main points and provide a conclusion.

*This is italic text* and **this is bold text**.

[Link Text](https://example.com)

\`\`\`
// Code block
function example() {
  return "Hello World";
}
\`\`\`

---

*This article is for informational purposes only.*
`;
    
    // Load blog data if in edit mode
    useEffect(() => {
        // Initialize CloudinaryImageService
        CloudinaryImageService.initialize();
        
        // Check if user is authenticated
        if (!AuthService.isAuthenticated()) {
            navigate('/Admin/login');
            return;
        }
        
        if (isEditMode) {
            try {
                const blog = BlogLocalStorage.getBlogById(id);
                if (blog) {
                    // Convert tags array to string if needed
                    const tagsString = Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '';
                    
                    setFormData({
                        title: blog.title || '',
                        category: blog.category || '',
                        tags: tagsString,
                        image: blog.image || '',
                        author: blog.author || 'Dr. Sarah Johnson',
                        excerpt: blog.excerpt || '',
                        content: blog.content || ''
                    });
                    
                    console.log('Loaded blog for editing:', blog);
                    console.log('Image ID/URL:', blog.image);
                    
                    // Debug all images in the blog content
                    findImagesInContent(blog.content);
                } else {
                    setError('Blog post not found.');
                    setTimeout(() => navigate('/Blog'), 2000);
                }
            } catch (error) {
                console.error('Error loading blog for editing:', error);
                setError('Failed to load blog post for editing.');
            }
        } else {
            // For new blog, provide a template
            setFormData(prev => ({
                ...prev,
                content: markdownTemplate
            }));
        }
    }, [isEditMode, id, navigate, markdownTemplate]);
    
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
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // Handle featured image selection
    const handleImageSelect = (imageIdOrUrl) => {
        console.log('Featured image selected:', imageIdOrUrl);
        setFormData(prevData => ({
            ...prevData,
            image: imageIdOrUrl
        }));
    };
    
    // Insert markdown elements at cursor position
    const insertMarkdown = (markdownSyntax, placeholder = '') => {
        const textarea = document.getElementById('content-editor');
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        
        const textToInsert = selectedText || placeholder;
        const newText = formData.content.substring(0, start) + markdownSyntax.replace('TEXT', textToInsert) + formData.content.substring(end);
        
        setFormData(prevData => ({
            ...prevData,
            content: newText
        }));
        
        // Set focus back to textarea
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + markdownSyntax.indexOf('TEXT') + textToInsert.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    
    // Insert text at cursor position
    const insertTextAtCursor = (text) => {
        const textarea = document.getElementById('content-editor');
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        const newText = formData.content.substring(0, start) + text + formData.content.substring(end);
        
        setFormData(prevData => ({
            ...prevData,
            content: newText
        }));
        
        // Set focus back to textarea and position cursor after inserted text
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + text.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    
    // Add various markdown elements
    const addHeading = () => insertMarkdown('## TEXT', 'Heading');
    const addBold = () => insertMarkdown('**TEXT**', 'bold text');
    const addItalic = () => insertMarkdown('*TEXT*', 'italic text');
    const addUnorderedList = () => insertMarkdown('- TEXT\n- Item 2\n- Item 3', 'Item 1');
    const addOrderedList = () => insertMarkdown('1. TEXT\n2. Item 2\n3. Item 3', 'Item 1');
    const addLink = () => insertMarkdown('[TEXT](url)', 'link text');
    const addQuote = () => insertMarkdown('> TEXT', 'Quote goes here');
    const addTable = () => insertMarkdown('| Header 1 | Header 2 | Header 3 |\n|----------|----------|----------|\n| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |\n| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |');
    const addCode = () => insertMarkdown('```\nTEXT\n```', 'Your code here');
    
    // Handle inserting an image
    const handleInsertImage = async () => {
        console.log('Opening file picker for image insertion...');
        
        // Open file picker
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            console.log('Selected file:', file.name, file.type, file.size);
            
            try {
                // Insert a placeholder at cursor position
                const placeholderText = `![Uploading ${file.name}...]()`;
                console.log('Inserting placeholder:', placeholderText);
                insertTextAtCursor(placeholderText);
                
                // Upload the image to Cloudinary
                console.log('Uploading to Cloudinary...');
                const uploadedImage = await CloudinaryImageService.uploadImage(file);
                console.log('Image uploaded successfully:', uploadedImage);
                
                // Verify we have the necessary data
                if (!uploadedImage || !uploadedImage.id || !uploadedImage.url) {
                    throw new Error('Invalid upload response from Cloudinary');
                }
                
                // Confirm image is saved in storage
                const imageStorage = CloudinaryImageService.debugStorage();
                console.log('Image storage after upload:', imageStorage);
                
                // Create the markdown with the image ID
                const imageMarkdown = `![${file.name}](${uploadedImage.id})`;
                console.log('Image markdown to insert:', imageMarkdown);
                
                // Update content by replacing the placeholder with the image markdown
                const currentContent = formData.content;
                
                // Make sure the placeholder exists in the content
                if (!currentContent.includes(placeholderText)) {
                    console.warn('Placeholder not found in content. Using direct insertion.');
                    insertTextAtCursor(imageMarkdown);
                } else {
                    const updatedContent = currentContent.replace(placeholderText, imageMarkdown);
                    
                    // Verify replacement worked
                    if (updatedContent === currentContent) {
                        console.warn('Replacement failed. Using alternative method.');
                        // Try an alternative replacement approach
                        const textArea = document.getElementById('content-editor');
                        const start = textArea.selectionStart;
                        const end = textArea.selectionEnd;
                        const textBeforeCursor = currentContent.substring(0, start);
                        const textAfterCursor = currentContent.substring(end);
                        
                        // Find the placeholder in the nearby text
                        const placeholderIndex = textBeforeCursor.lastIndexOf(placeholderText);
                        
                        if (placeholderIndex !== -1) {
                            // Replace just that occurrence
                            const newContent = 
                                textBeforeCursor.substring(0, placeholderIndex) + 
                                imageMarkdown + 
                                textBeforeCursor.substring(placeholderIndex + placeholderText.length) + 
                                textAfterCursor;
                                
                            setFormData(prevData => ({
                                ...prevData,
                                content: newContent
                            }));
                        } else {
                            // If all else fails, just insert at cursor
                            insertTextAtCursor(imageMarkdown);
                        }
                    } else {
                        // Normal case - replacement worked
                        setFormData(prevData => ({
                            ...prevData,
                            content: updatedContent
                        }));
                        console.log('Content updated with image markdown');
                    }
                }
                
                // Test preview conversion
                const previewUrl = CloudinaryImageService.getImageUrl(uploadedImage.id);
                console.log('Preview URL for testing:', previewUrl);
                
            } catch (error) {
                console.error('Failed to upload image:', error);
                alert(`Failed to upload image: ${error.message}`);
                
                // Remove the placeholder if upload failed
                const updatedContent = formData.content.replace(`![Uploading ${file.name}...]()`, '');
                setFormData(prevData => ({
                    ...prevData,
                    content: updatedContent
                }));
            }
        };
        
        input.click();
    };
    
    // Toggle preview mode
    const togglePreview = () => {
        setPreviewMode(!previewMode);
        
        // If entering preview mode, debug all images in content
        if (!previewMode) {
            findImagesInContent(formData.content);
        }
    };
    
    // Generate excerpt from content if not manually entered
    const generateExcerpt = (content) => {
        // Remove Markdown formatting
        let plainText = content
            .replace(/#+\s+/g, '') // Remove headings
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
            .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
            .replace(/!\[([^\]]+)\]\([^)]+\)/g, '') // Remove images
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/`([^`]+)`/g, '$1') // Remove inline code
            .replace(/>\s+(.*)/g, '$1') // Remove blockquotes
            .replace(/\n+/g, ' ') // Replace newlines with spaces
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();
            
        // Get first 150 characters, ending at the last complete word
        return plainText.substring(0, 150).replace(/\s+\S*$/, '') + '...';
    };
    
    // This function is only used directly in the component, not in JSX/rendering
    // eslint-disable-next-line no-unused-vars
    const processMarkdownContent = (markdown) => {
        if (!markdown) return '';
        
        console.log('Processing markdown content...');
        
        // First, let's detect any image tags in the markdown
        const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let hasImages = false;
        
        console.log('Detecting images in markdown:');
        while ((match = imageRegex.exec(markdown)) !== null) {
            hasImages = true;
            const [fullMatch, altText, src] = match;
            console.log(`Found image: ${fullMatch}`);
            console.log(`  Alt text: ${altText}`);
            console.log(`  Source: ${src}`);
        }
        
        if (!hasImages) {
            console.log('No images found in markdown');
        }
        
        // Now replace image IDs with URLs for the preview
        // This regex specifically looks for image syntax with a source that starts with "img_"
        const processedMarkdown = markdown.replace(/!\[([^\]]+)\]\((img_[^)]+)\)/g, (match, altText, imageId) => {
            console.log(`Processing image match: ${match}`);
            
            // Try to get the URL from CloudinaryImageService
            const imageUrl = CloudinaryImageService.getImageUrl(imageId);
            
            if (imageUrl) {
                console.log(`✓ Found URL for ${imageId}: ${imageUrl}`);
                return `![${altText}](${imageUrl})`;
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
    
    // Save the blog post
    const saveBlogPost = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        
        try {
            // Validate required fields
            if (!formData.title.trim()) {
                throw new Error('Title is required');
            }
            if (!formData.category.trim()) {
                throw new Error('Category is required');
            }
            if (!formData.content.trim()) {
                throw new Error('Content is required');
            }
            
            // Create full blog data
            const blogData = {
                ...formData,
                // Generate excerpt if not provided
                excerpt: formData.excerpt.trim() || generateExcerpt(formData.content),
                // Process tags - handle both string and array cases
                tags: typeof formData.tags === 'string' 
                    ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                    : (Array.isArray(formData.tags) ? formData.tags : [])
            };
            
            console.log('Saving blog with data:', blogData);
            
            // Check for image IDs in content and verify they exist
            findImagesInContent(blogData.content);
            
            // Save to localStorage
            if (isEditMode) {
                BlogLocalStorage.updateBlog(id, blogData);
            } else {
                BlogLocalStorage.createBlog(blogData);
            }
            
            // Show success message
            alert(`Blog post ${isEditMode ? 'updated' : 'created'} successfully!`);
            
            // Navigate back to admin dashboard
            navigate('/Admin/dashboard');
        } catch (error) {
            console.error('Error saving blog post:', error);
            setError(error.message || 'Failed to save blog post. Please try again.');
            window.scrollTo(0, 0); // Scroll to top to see error
        } finally {
            setSaving(false);
        }
    };
    
    return (
        <section className="blog-editor-section">
            <div className="container">
                <div className="editor-header">
                    <h1>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
                    <p>Write, format, and preview your blog post using Markdown syntax</p>
                </div>
                
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
                
                <form onSubmit={saveBlogPost} className="blog-editor-form">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label htmlFor="title">Blog Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter a descriptive title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Preventive Care">Preventive Care</option>
                                    <option value="Healthcare Technology">Healthcare Technology</option>
                                    <option value="Nutrition">Nutrition</option>
                                    <option value="Pain Management">Pain Management</option>
                                    <option value="Mental Health">Mental Health</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Women's Health">Women's Health</option>
                                    <option value="Men's Health">Men's Health</option>
                                    <option value="Fitness">Fitness</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="tags">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="e.g., Health, Nutrition, Wellness"
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    placeholder="Author name"
                                    value={formData.author}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Featured Image Uploader */}
                    <ImageUploader 
                        onImageSelect={handleImageSelect}
                        currentImage={formData.image}
                        label="Featured Image"
                    />
                    
                    <div className="form-group">
                        <label htmlFor="excerpt">Excerpt (optional)</label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            rows="3"
                            placeholder="Brief summary of your post (if left empty, will be generated automatically)"
                            value={formData.excerpt}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    
                    <div className="editor-toolbar">
                        <button type="button" onClick={addHeading} title="Add Heading">
                            <FaHeading />
                        </button>
                        <button type="button" onClick={addBold} title="Bold Text">
                            <FaBold />
                        </button>
                        <button type="button" onClick={addItalic} title="Italic Text">
                            <FaItalic />
                        </button>
                        <button type="button" onClick={addUnorderedList} title="Bulleted List">
                            <FaListUl />
                        </button>
                        <button type="button" onClick={addOrderedList} title="Numbered List">
                            <FaListOl />
                        </button>
                        <button type="button" onClick={addLink} title="Add Link">
                            <FaLink />
                        </button>
                        <button type="button" onClick={handleInsertImage} title="Insert Image">
                            <FaImage />
                        </button>
                        <button type="button" onClick={addQuote} title="Block Quote">
                            <FaQuoteLeft />
                        </button>
                        <button type="button" onClick={addTable} title="Insert Table">
                            <FaTable />
                        </button>
                        <button type="button" onClick={addCode} title="Code Block">
                            <FaCode />
                        </button>
                        <button
                            type="button"
                            className={`preview-toggle ${previewMode ? 'active' : ''}`}
                            onClick={togglePreview}
                            title="Toggle Preview"
                        >
                            <FaEye />
                            {previewMode ? 'Edit' : 'Preview'}
                        </button>
                    </div>
                    
                    <div className="editor-container">
                        {previewMode ? (
                            <div className="markdown-preview">
                                <h2>Preview</h2>
                                <div className="preview-content">
                                    {/* Custom image component to handle image IDs and sizing */}
                                    <ReactMarkdown components={{
                                        img: ({node, ...props}) => {
                                            // Get the original src from props
                                            let src = props.src;
                                            
                                            // If it's an image ID, convert to URL before displaying
                                            if (src && src.startsWith('img_')) {
                                                const imageUrl = CloudinaryImageService.getImageUrl(src);
                                                if (imageUrl) {
                                                    src = imageUrl;
                                                }
                                            }
                                            
                                            // Return the image with controlled dimensions and the processed src
                                            return (
                                                <img 
                                                    {...props} 
                                                    src={src} 
                                                    alt={props.alt || "Preview image"}
                                                    className="preview-image"
                                                    style={{
                                                        maxWidth: '100%',
                                                        height: 'auto',
                                                        maxHeight: '400px',
                                                        margin: '15px auto',
                                                        display: 'block',
                                                        borderRadius: '4px'
                                                    }} 
                                                />
                                            );
                                        }
                                    }}>
                                        {formData.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="content-editor">Content (Markdown)</label>
                                <textarea
                                    id="content-editor"
                                    name="content"
                                    rows="20"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Write your blog content using Markdown..."
                                    required
                                ></textarea>
                            </div>
                        )}
                    </div>
                    
                    <div className="editor-footer">
                        <div className="markdown-help-toggle">
                            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">
                                Markdown Syntax Help
                            </a>
                        </div>
                        <div className="form-buttons">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => navigate('/Admin/dashboard')}
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-save"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <div className="spinner-small"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> {isEditMode ? 'Update Post' : 'Save Post'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default BlogEditor;