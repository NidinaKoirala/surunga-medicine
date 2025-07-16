// Contact.js
import React, { useState, useRef } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Social Media Configuration - Easy to add/edit social media handles
const socialMediaLinks = [
    {
        platform: 'facebook',
        url: 'https://facebook.com/surungamedicine',
        icon: FaFacebookF,
        className: 'social-link facebook'
    },
    {
        platform: 'x',
        url: 'https://x.com/Surungamedicine',
        icon: FaXTwitter,
        className: 'social-link x'
    },
    {
        platform: 'instagram',
        url: 'https://instagram.com/surunga_medicine_center',
        icon: FaInstagram,
        className: 'social-link instagram'
    },
    {
        platform: 'youtube',
        url: 'https://youtube.com/@SurungaMedicineClinic ',
        icon: FaYoutube,
        className: 'social-link youtube'
    },
    {
        platform: 'whatsapp',
        url: 'https://wa.me/9779804964107',
        icon: FaWhatsapp,
        className: 'social-link whatsapp',
        target: '_blank',
        rel: 'noopener noreferrer'
    },
    {
        platform: 'tiktok',
        url: 'https://tiktok.com/@surungamedicinecenter',
        icon: FaTiktok,
        className: 'social-link tiktok'
    }
];

function Contact() {
    // Access EmailJS configuration from environment variables
    const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const EMAILJS_USER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_USER_TEMPLATE_ID; // Reuse appointment template
    const EMAILJS_ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID; // Reuse appointment template
    const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [formStatus, setFormStatus] = useState({
        submitting: false,
        success: false,
        error: false,
        message: ''
    });
    
    const form = useRef();
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus({
                submitting: false,
                success: false,
                error: true,
                message: 'Please fill out all required fields'
            });
            return;
        }
        
        // Set submitting state
        setFormStatus({
            submitting: true,
            success: false,
            error: false,
            message: 'Sending message...'
        });
        
        // First, send confirmation email to the user
        // Adapt the appointment template to work with contact form
        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_USER_TEMPLATE_ID,
            {
                name: formData.name,
                email: formData.email,
                phone: "Not provided", // Required by template but not collected
                patient_name: formData.name, // Reuse same field for contact
                reason_for_visit: formData.subject || "Website Contact Form",
                appointment_date: new Date().toLocaleDateString(), // Use current date
                appointment_time: new Date().toLocaleTimeString(), // Use current time
                provider_name: 'Surunga Medicine Team',
                additional_notes: formData.message,
                message: "Thank you for contacting Surunga Medicine! We will get back to you soon.",
                survey_link: "https://surungamedicine.com/survey?rating=",
                unsubscribe_link: "https://surungamedicine.com/unsubscribe?email=" + encodeURIComponent(formData.email),
            },
            EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
            console.log('User confirmation email sent successfully:', result.text);
            
            // Then send notification email to the admin
            // Adapt the appointment admin template
            return emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_ADMIN_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    phone: "Not provided",
                    patient_name: formData.name,
                    reason_for_visit: "CONTACT FORM: " + (formData.subject || "Website Inquiry"),
                    appointment_date: "N/A - Contact Form",
                    appointment_time: "N/A - Contact Form",
                    provider_name: 'N/A - Contact Form',
                    additional_notes: formData.message,
                    admin_email: ADMIN_EMAIL,
                    submission_date: new Date().toLocaleDateString(),
                    submission_time: new Date().toLocaleTimeString(),
                    _cc: ADMIN_EMAIL
                },
                EMAILJS_PUBLIC_KEY
            );
        })
        .then((result) => {
            console.log('Admin notification email sent successfully:', result.text);
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            
            // Update status
            setFormStatus({
                submitting: false,
                success: true,
                error: false,
                message: 'Your message has been sent successfully! We will get back to you soon.'
            });
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setFormStatus(prev => ({...prev, success: false, message: ''}));
            }, 5000);
        })
        .catch((error) => {
            console.error('Error sending email:', error.text);
            setFormStatus({
                submitting: false,
                success: false,
                error: true,
                message: 'There was an error sending your message. Please try again later or contact us directly.'
            });
        });
    };

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
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="contact-text">
                                    <h3> Location</h3>
                                    <p>Kankai-03, Jhapa</p>
                                    <p>Nepal</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaPhoneAlt />
                                </div>
                                <div className="contact-text">
                                    <h3> Phone</h3>
                                    <p>023-553097 / 9804964107 </p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="contact-text">
                                    <h3> Email</h3>
                                    <p>info@surungamedicine.com.np</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaClock />
                                </div>
                                <div className="contact-text">
                                    <h3>Hours</h3>
                                    <p>Always 6:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="social-links">
                            {socialMediaLinks.map((social, index) => {
                                const IconComponent = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        aria-label={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                                        className={social.className}
                                        target={social.target || undefined}
                                        rel={social.rel || undefined}
                                    >
                                        <IconComponent />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="contact-form-container">
                        
                        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
                            <h2>Send us a message</h2>
                            
                            {formStatus.success && (
                                <div className="form-status success">
                                    {formStatus.message}
                                </div>
                            )}
                            
                            {formStatus.error && (
                                <div className="form-status error">
                                    {formStatus.message}
                                </div>
                            )}
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        placeholder="Your name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        placeholder="Your email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label htmlFor="subject">Subject</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject"
                                        placeholder="Subject" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group full-width">
                                    <label htmlFor="message">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        rows="5" 
                                        placeholder="Your message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={formStatus.submitting}
                            >
                                {formStatus.submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
                
                <div className="map-container">
                    <h2><FaMapMarkerAlt className="section-icon" /> Find Us</h2>
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
                
            </div>
        </section>
    );
}

export default Contact;