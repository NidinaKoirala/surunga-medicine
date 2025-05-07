import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';
import BlogEditor from './BlogEditor';
import ProtectedRoute from './ProtectedRoute';
import './Blog.css';
import './BlogEditor.css';

// Import Admin components from Admin folder
// These imports are used by ProtectedRoute indirectly
// eslint-disable-next-line no-unused-vars
import AdminLogin from '../Admin/AdminLogin';
// eslint-disable-next-line no-unused-vars
import AdminDashboard from '../Admin/AdminDashboard';

// Initialize the BlogLocalStorage when this component is first imported
import BlogLocalStorage from './BlogLocalStorage';
BlogLocalStorage.initialize();

function Blog() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<BlogList />} />
            <Route path="/:id" element={<BlogDetail />} />
            
            {/* Protected routes - will be redirected to Admin/login if not authenticated */}
            <Route path="/new" element={
                <ProtectedRoute>
                    <BlogEditor />
                </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
                <ProtectedRoute>
                    <BlogEditor />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default Blog;