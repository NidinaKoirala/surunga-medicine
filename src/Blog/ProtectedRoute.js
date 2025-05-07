import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from './AuthService';

// This component handles protected routes that require authentication
function ProtectedRoute({ children }) {
    const location = useLocation();
    const isAuthenticated = AuthService.isAuthenticated();
    
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/Admin/login" state={{ from: location }} replace />;
    }
    
    // If authenticated, render the protected component
    return children;
}

export default ProtectedRoute;