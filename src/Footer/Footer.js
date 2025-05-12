import React from 'react';
import { Link } from 'react-router-dom';
import logoimg from '../assets/images/logo-hospital.png';
import './Footer.css';

function Footer() {
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
    
    // Scroll to top when navigating to a new page
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };
    
    return (
        <footer className="footer-section">
            <div className="container">
                {/* Top section with three columns and logo on right */}
                <div className="footer-top">
                    <div className="footer-columns">
                        <div className="footer-logo-column">
                            <div className="footer-logo">
                                <img src={logoimg} alt="Surunga Medicine and Clinic" className="img-fluid" />
                            </div>
                        </div>
                        
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <ul className="footer-list">
                                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                                <li><Link to="/About" onClick={handleLinkClick}>About Us</Link></li>
                                <li><Link to="/AllDoctors" onClick={handleLinkClick}>Our Doctors</Link></li>
                                <li><Link to="/Blog" onClick={handleLinkClick}>Blog</Link></li>
                                <li><Link to="/Contact" onClick={handleLinkClick}>Contact Us</Link></li>
                            </ul>
                        </div>
                        
                        <div className="footer-column">
                            <h3>Our Services</h3>
                            <ul className="footer-list">
                                <li>General Consultation</li>
                                <li>Diagnostic Services</li>
                                <li>Specialized Treatment</li>
                                <li>Preventive Healthcare</li>
                                <li>Emergency Services</li>
                            </ul>
                        </div>
                        
                        <div className="footer-column">
                            <h3>Contact Us</h3>
                            <ul className="footer-list contact-list">
                                <li>
                                    <span>023-553097 / 9804964107 </span>
                                </li>
                                <li>
                                    <span>appointment@surungamedicine.com.np</span>
                                </li>
                                <li>
                                    <span>Surunga, Jhapa, Nepal</span>
                                </li>
                                <li>
                                    <span>Sun-Sat: 8AM - 9PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Description section below */}
                <div className="footer-description">
                    <p>
                        Surunga Medicine and Clinic is committed to providing high-quality healthcare services with compassion and care. Our team of experienced medical professionals is dedicated to your well-being.
                    </p>
                </div>
            </div>
            
            <div className="copyright-section">
                <div className="container">
                    <p>&copy; {currentYear} <span className="clinic-name">Surunga Medicine and Clinic</span>. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;