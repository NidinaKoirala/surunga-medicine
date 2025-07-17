import React from 'react';
import './About.css';

// Import main about image
import aboutImage from '../assets/images/about-us/about_image.jpg';

// Import about-us folder images
import childrenDoctorImage from '../assets/images/about-us/children-doctor.jpg';
import diabitiesThyroidImage from '../assets/images/about-us/diabities-thyrod-doc.jpg';
import ourvision from '../assets/images/about-us/ourvision.png';
import stomachDocImage from '../assets/images/about-us/great-lever-stomach-doc.jpg';

// Import icons
import { FaHospital, FaUserMd, FaFlask, FaHandHoldingMedical, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';

// Import Team component
import Team from '../Team/Team';

function About() {
    // Stats data
    const stats = [
        { icon: <FaHospital />, count: '10+', title: 'Years of Experience' },
        { icon: <FaUserMd />, count: '20+', title: 'Expert Doctors' },
        { icon: <FaHandHoldingMedical />, count: '1,00,0000+', title: 'Patients Treated' },
        { icon: <FaFlask />, count: '10000+', title: 'Lab Tests' }
    ];
    
    // Specialized services data
    const specializedServices = [
        {
            title: "Pediatric Care",
            description: "Our specialized pediatric department provides comprehensive care for children of all ages, from infants to adolescents, with state-of-the-art facilities and child-friendly environments.",
            image: childrenDoctorImage
        },
        {
            title: "Diabetes & Thyroid Management",
            description: "Our endocrinology department offers specialized care for diabetes and thyroid disorders, with personalized treatment plans and continuous monitoring for optimal health outcomes.",
            image: diabitiesThyroidImage
        },
        {
            title: "Gastroenterology Services",
            description: "Our gastroenterology specialists diagnose and treat a wide range of digestive system disorders using advanced diagnostic tools and evidence-based treatment approaches.",
            image: stomachDocImage
        }
    ];
    
    
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>About Us</h1>
                        <p>Committed to Excellence in Healthcare</p>
                    </div>
                </div>
                <div className="hero-overlay"></div>
            </section>
            
            {/* Main About Section */}
            <section className="about-main">
                <div className="container">
                    <div className="about-content">
                        <div className="about-image">
                            <img src={aboutImage} alt="About Surunga Medicine & Clinic" />
                        </div>
                        <div className="about-text">
                            <h2>Welcome to Surunga Medicine & Clinic</h2>
                            <p>
                                Established in 2016 (2073 B.S.), Surunga Medicine and Clinic has been dedicated to delivering reliable, accessible, and high-quality healthcare to the people of Jhapa District. Over the years, we have become a trusted name in the community because we always put our patients' needs first and provide them with the best care possible.
                            </p>
                            <p>
                            We combine compassionate, personalized care with the latest in medical technology to support you at every step of your health journey. From booking appointments to managing your health records, we ensure every part of your experience is smooth, simple, and convenient.
                            </p>
                            <p>
                            Whether you're visiting us for a routine check-up, consultation, or ongoing treatment, our dedicated team is here to serve you with professionalism, respect, and empathy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <h3 className="stat-count">{stat.count}</h3>
                                <p className="stat-title">{stat.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Vision Section */}
            <section className="about-vision">
                <div className="container">
                    <div className="vision-content">
                        <div className="vision-text">
                            <h2>Our Vision</h2>
                            <p>
                                Our vision at Surunga Medicine & Clinic is to create a seamless healthcare experience for every patient. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                            </p>
                            <p>
                            Our team is always here to help you feel better and stay healthy. You can trust us to take good care of you every time you visit.
                            </p>
                            <div className="vision-points">
                                <div className="vision-point">
                                    <FaHeartbeat className="point-icon" />
                                    <div>
                                        <h4>Patient-Centered Care</h4>
                                        <p>Putting patients first in everything we do</p>
                                    </div>
                                </div>
                                <div className="vision-point">
                                    <FaCalendarCheck className="point-icon" />
                                    <div>
                                        <h4>Accessible Healthcare</h4>
                                        <p>Making quality healthcare available to all</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vision-image">
                            <img src={ourvision} alt="Our Vision" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Specialized Services Section */}
            <section className="about-services">
                <div className="container">
                    <div className="services-header">
                        <h2>Our Specialized Services</h2>
                        <p>We offer a range of specialized services to address specific healthcare needs</p>
                    </div>
                    
                    <div className="services-grid">
                        {specializedServices.map((service, index) => (
                            <div key={index} className="service-highlight-card">
                                <div className="service-highlight-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                                <div className="service-highlight-details">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>            
            
            {/* Team Section - Using the separate Team component */}
            <Team />
        </div>
    );
}

export default About;