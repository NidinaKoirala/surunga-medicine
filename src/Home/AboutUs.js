import React from 'react';
import './AboutUs.css';
import aboutImage from '../assets/images/home/about-img.png'; // You'll need to add this image
import { FaCheckCircle } from "react-icons/fa";

function AboutUs() {
    const highlights = [
        "10+ years of excellence in healthcare services",
        "500+ highly qualified doctors across specialties",
        "100,000+ successful patient consultations",
        "State-of-the-art virtual consultation technology",
        "Highest standards of patient care and privacy",
        "Affordable healthcare plans for individuals and families"
    ];
    
    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 about-image-container">
                        <img src={aboutImage} alt="Medical professionals" className="img-fluid about-image" />
                        <div className="experience-badge">
                            <span className="years">10+</span>
                            <span className="text">Years of Experience</span>
                        </div>
                    </div>
                    <div className="col-lg-6 about-content">
                        <div className="section-tag">About Us</div>
                        <h2 className="section-title">Delivering Excellence in Healthcare Since 2013</h2>
                        <p className="about-description">
                            At MedConnect, we're revolutionizing the way you access healthcare services. Our platform 
                            connects patients with the best healthcare professionals, making quality medical care accessible 
                            to everyone, everywhere.
                        </p>
                        <p className="about-description">
                            Our mission is to bridge the gap between patients and doctors, providing a seamless and 
                            efficient healthcare experience through cutting-edge technology and a user-friendly interface.
                        </p>
                        <div className="highlights-list">
                            {highlights.map((item, index) => (
                                <div key={index} className="highlight-item">
                                    <FaCheckCircle className="highlight-icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <button className="learn-more-btn">Learn More About Us</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;