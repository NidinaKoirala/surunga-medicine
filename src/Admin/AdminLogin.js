import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import AuthService from '../Blog/AuthService';
import './AdminLogin.css';

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if already authenticated
    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            navigate('/Admin/dashboard');
        }
    }, [navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle login submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!credentials.username.trim() || !credentials.password.trim()) {
            setError('Username and password are required');
            setLoading(false);
            return;
        }

        // Attempt login
        const success = AuthService.login(credentials.username, credentials.password);
        
        if (success) {
            // Redirect to the page they tried to visit or dashboard
            const from = location.state?.from?.pathname || '/Admin/dashboard';
            navigate(from);
        } else {
            setError('Invalid username or password');
            setLoading(false);
        }
    };

    return (
        <section className="admin-login-section">
            <div className="container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>Blog Admin Access</h1>
                        <p>Enter your credentials to manage blog content</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">
                                <FaUser /> Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter admin username"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FaLock /> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter admin password"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? (
                                <div className="spinner-small"></div>
                            ) : (
                                <>
                                    <FaSignInAlt /> Login
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Back to <a href="/Blog">Blog Home</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;