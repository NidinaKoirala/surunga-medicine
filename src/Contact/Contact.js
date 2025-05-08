// Contact.js
import React from 'react';
import './Contact.css';
import contactimg from '../assets/images/contact_image.png'; // Replace with your actual image path

function Contact() {
    return (
        <section className="contact-section" id="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <p className="contact-subtitle">We're here to help with all your medical needs</p>
                </div>
                
                <div className="contact-content">
                    <div className="contact-info-card">
                        <div className="contact-info-header">
                            <h2>Contact Information</h2>
                            <p>Reach out to us through any of these channels</p>
                        </div>
                        
                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Location</h3>
                                    <p>Kankai-03, Jhapa</p>
                                    <p>Nepal</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Phone</h3>
                                    <p>+977 9832322323</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Email</h3>
                                    <p>surungamedicine@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div className="contact-text">
                                    <h3>Hours</h3>
                                    <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                                    <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="social-links">
                            <a href="https://facebook.com" aria-label="Facebook" className="social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com" aria-label="Twitter" className="social-link"><i className="fab fa-twitter"></i></a>
                            <a href="https://instagram.com" aria-label="Instagram" className="social-link"><i className="fab fa-instagram"></i></a>
                            <a href="https://linkedin.com" aria-label="LinkedIn" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div className="contact-form-container">
                        <div className="contact-image-container">
                            <img src={contactimg} alt="Surunga Medicine" className="contact-image" />
                        </div>
                        
                        <form className="contact-form">
                            <h2>Send us a message</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" placeholder="Your name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="Your email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" placeholder="Subject" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" rows="5" placeholder="Your message"></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
                
                <div className="map-container">
                    <h2>Find Us</h2>
                    <div className="google-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.9019377351285!2d87.88773391503809!3d26.641108883262635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5bdaf65d8032f%3A0x60111939f874a53c!2sSurunga%20medicine%20center%20%26%20chandrodaya%20clinic!5e0!3m2!1sen!2sus!4v1588442696675!5m2!1sen!2sus"
                            width="100%" 
                            height="450" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Surunga Medicine Center Location"
                        ></iframe>
                    </div>
                </div>
                
                <div className="careers-section">
                    <div className="careers-content">
                        <h2>CAREERS AT SURUNGA MEDICINE</h2>
                        <p>Join our dedicated team of healthcare professionals. Learn more about our teams and job openings.</p>
                        <button className="careers-btn">Explore Jobs</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;