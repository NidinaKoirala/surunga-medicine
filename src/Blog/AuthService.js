// Simple authentication service for blog admin access

// Hardcoded credentials (in a real app, you'd use a more secure approach)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin"; // You can change this to your preferred password

// This key will be used to store the auth status in localStorage
const AUTH_STORAGE_KEY = "medconnect_blog_auth";

const AuthService = {
  // Login with username and password
  login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create auth token (in a simple format with timestamp)
      const token = {
        username: username,
        isAdmin: true,
        timestamp: new Date().getTime(),
        // Token expires after 24 hours
        expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000)
      };
      
      // Store in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token));
      return true;
    }
    return false;
  },
  
  // Logout - clear auth data
  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    try {
      const authData = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
      
      // Check if auth data exists and is not expired
      if (authData && authData.expiresAt > new Date().getTime()) {
        return true;
      }
      
      // If token is expired, clean it up
      if (authData) {
        this.logout();
      }
      
      return false;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  },
  
  // Get the current admin username (if authenticated)
  getAdminUsername() {
    try {
      if (this.isAuthenticated()) {
        const authData = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
        return authData.username;
      }
      return null;
    } catch (error) {
      console.error("Error getting admin username:", error);
      return null;
    }
  }
};

export default AuthService;