import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logoimg from '../assets/images/logo-hospital.png';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
    const location = useLocation();
    
    // Handle window resize to detect mobile vs desktop
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
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
    
    // Handle direct navigation (for mobile)
    const handleDirectNavigation = (path) => {
        // First scroll to top
        window.scrollTo(0, 0);
        
        // Close the menu with a slight delay to ensure the click registers
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
        
        // Use direct navigation
        window.location.href = path;
    };
    
    // Handle React Router navigation (for desktop)
    const handleRouterNavigation = () => {
        // Scroll to top
        window.scrollTo(0, 0);
    };
    
    // Special handler for Blog link 
    const handleBlogClick = (e) => {
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Close the menu with a slight delay
        setTimeout(() => {
            setIsOpen(false);
        }, 100);
        
        // If we're already on blog, just refresh the page
        if (location.pathname === '/Blog' || location.pathname.startsWith('/Blog/')) {
            window.location.reload();
        } else {
            // Use direct navigation instead of React Router
            window.location.href = '/Blog';
        }
        
        // Prevent default
        e.preventDefault();
    };
    
    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className='container'>
                <nav className="navbar">
                    <div className="navbar-container">
                        {/* Logo */}
                        {isMobile ? (
                            // Use direct navigation for mobile
                            <a href="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
                                <img src={logoimg} alt="Hospital Logo" />
                                <span>MedConnect</span>
                            </a>
                        ) : (
                            // Use React Router for desktop
                            <Link to="/" className="logo" onClick={handleRouterNavigation}>
                                <img src={logoimg} alt="Hospital Logo" />
                                <span>MedConnect</span>
                            </Link>
                        )}
                        
                        {/* Toggle Button */}
                        <div className={`toggle-btn ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        
                        {/* Nav Links - Separate implementation for mobile and desktop */}
                        {isMobile ? (
                            // Mobile navigation with direct links
                            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                                <li>
                                    <a href="/" className={isActive('/')} onClick={() => handleDirectNavigation('/')}>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/About" className={isActive('/About')} onClick={() => handleDirectNavigation('/About')}>
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="/AllDoctors" className={isActive('/AllDoctors')} onClick={() => handleDirectNavigation('/AllDoctors')}>
                                        All Doctors
                                    </a>
                                </li>
                                <li>
                                    <a href="/Blog" className={isActive('/Blog')} onClick={handleBlogClick}>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/Contact" className={isActive('/Contact')} onClick={() => handleDirectNavigation('/Contact')}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            // Desktop navigation with React Router
                            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                                <li>
                                    <Link to="/" className={isActive('/')} onClick={handleRouterNavigation}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/About" className={isActive('/About')} onClick={handleRouterNavigation}>
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/AllDoctors" className={isActive('/AllDoctors')} onClick={handleRouterNavigation}>
                                        All Doctors
                                    </Link>
                                </li>
                                <li>
                                    <a href="/Blog" className={isActive('/Blog')} onClick={handleBlogClick}>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <Link to="/Contact" className={isActive('/Contact')} onClick={handleRouterNavigation}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        )}
                        
                        {/* Make Appointment Button - also separate for mobile/desktop */}
                        <div className="create-account">
                            {isMobile ? (
                                <a href="/Appointment" className="btn text-white" onClick={() => handleDirectNavigation('/Appointment')}>
                                    Make Appointment
                                </a>
                            ) : (
                                <Link to="/Appointment" className="btn text-white" onClick={handleRouterNavigation}>
                                    Make Appointment
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
            
            {/* Mobile backdrop - only appears when menu is open */}
            {isOpen && <div className="mobile-backdrop" onClick={closeMenu}></div>}
        </header>
    );
}

export default Navbar;