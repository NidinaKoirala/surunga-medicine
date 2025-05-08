import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    // In a real application, you would validate credentials against a backend
    // For this demo, we're using a simple hardcoded check
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            // Simple validation - in a real app, this would be a server request
            if (username === 'admin' && password === 'admin123') {
                // Set some authentication token or state
                localStorage.setItem('adminLoggedIn', 'true');
                navigate('/admin/doctors');
            } else {
                setError('Invalid username or password');
            }
            setLoading(false);
        }, 1000);
    };
    
    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <h1>Admin Login</h1>
                    <p>Enter your credentials to access the dashboard</p>
                </div>
                
                {error && <div className="login-error">{error}</div>}
                
                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="username">
                            <FontAwesomeIcon icon={faUser} /> Username
                        </label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">
                            <FontAwesomeIcon icon={faLock} /> Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="login-btn" 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : (
                            <>
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </>
                        )}
                    </button>
                </form>
                
                <div className="login-help">
                    <p>For demo purposes: Username: admin, Password: admin123</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;