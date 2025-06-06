import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';
import aboutImage from '../assets/images/home/about-img.png';
import { FaCheckCircle, FaUserMd, FaHospital, FaHeartbeat } from "react-icons/fa";

function AboutUs() {
    const achievements = [
        {
            icon: <FaHospital />,
            count: "10+",
            title: "Years Experience"
        },
        {
            icon: <FaUserMd />,
            count: "20+",
            title: "Specialist Doctors"
        },
        {
            icon: <FaHeartbeat />,
            count: "100K+",
            title: "Happy Patients"
        }
    ];
    
    const highlights = [
        "State-of-the-art virtual consultation technology",
        "Highest standards of patient care and privacy",
        "Affordable healthcare plans for families",
        "24/7 emergency medical support",
        "Personalized healthcare solutions",
        "Comprehensive health records management"
    ];
    
    return (
        <section className="aboutus-section">
            <div className="container">
                <div className="aboutus-content">
                    <div className="aboutus-text">
                        <div className="aboutus-header">
                            <div className="section-subtitle">About Us</div>
                            <h2 className="section-title">Delivering Excellence in Healthcare Since 2016</h2>
                        </div>
                        
                        <p className="aboutus-description">
                            At Surunga Medicine & Clinic, we're revolutionizing the way you access healthcare services. Our platform 
                            connects patients with the best healthcare professionals, making quality medical care accessible 
                            to everyone, everywhere.
                        </p>
                        
                        <div className="achievements-row">
                            {achievements.map((item, index) => (
                                <div key={index} className="achievement-item">
                                    <div className="achievement-icon">{item.icon}</div>
                                    <div className="achievement-content">
                                        <h3 className="achievement-count">{item.count}</h3>
                                        <p className="achievement-title">{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="highlights-grid">
                            {highlights.map((item, index) => (
                                <div key={index} className="highlight-item">
                                    <FaCheckCircle className="highlight-icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Link to="/About" className="aboutus-button">
                            Learn More About Us
                        </Link>
                    </div>
                    
                    <div className="aboutus-image">
                        <div className="image-wrapper">
                            <img src={aboutImage} alt="Medical professionals" />
                            <div className="experience-badge">
                                <div className="badge-content">
                                    <span className="years">10+</span>
                                    <span className="text">Years of Excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;