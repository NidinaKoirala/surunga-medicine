import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Make sure to update with our new CSS
import logoimg from '../assets/images/logo-hospital.png'; // Adjust path as needed
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    
    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Close menu when clicking anywhere else
    const closeMenu = () => {
        if (isOpen) setIsOpen(false);
    };
    
    // Check if a link is active
    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') {
            return 'active';
        }
        return location.pathname === path || location.pathname.startsWith(path + '/') ? 'active' : '';
    };
    
    // Special handler for Blog link to force page refresh
    const handleBlogClick = (e) => {
        // Close the menu first (for mobile)
        closeMenu();
        
        // Check if we're already on a blog page
        if (location.pathname === '/Blog' || location.pathname.startsWith('/Blog/')) {
            // If we're already on blog, just refresh the page
            window.location.reload();
        } else {
            // If we're not on blog, navigate to it with a full page load
            // instead of using React Router's client-side navigation
            window.location.href = '/Blog';
            
            // Prevent default Link behavior
            e.preventDefault();
        }
    };
    
    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className='container'>
                <nav className="navbar">
                    <div className="navbar-container">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <img src={logoimg} alt="Hospital Logo" />
                            <span>MedConnect</span>
                        </Link>
                        
                        {/* Toggle Button */}
                        <div className={`toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        
                        {/* Nav Links */}
                        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                            <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
                            <li><Link to="/About" className={isActive('/About')} onClick={closeMenu}>About us</Link></li>
                            <li><Link to="/AllDoctors" className={isActive('/AllDoctors')} onClick={closeMenu}>All Doctors</Link></li>
                            <li>
                                {/* Special Blog link that forces refresh */}
                                <a 
                                    href="/Blog" 
                                    className={isActive('/Blog')} 
                                    onClick={handleBlogClick}
                                >
                                    Blog
                                </a>
                            </li>
                            <li><Link to="/Contact" className={isActive('/Contact')} onClick={closeMenu}>Contact</Link></li>
                        </ul>
                        
                        {/* Create Account Button */}
                        <div className="create-account">
                            <Link to="/Home" className="btn text-white">Make Appointment</Link>
                        </div>
                    </div>
                </nav>
            </div>
            
            {/* Mobile backdrop - only appears when menu is open */}
            {isOpen && <div className={`mobile-backdrop ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>}
        </header>
    );
}

export default Navbar;