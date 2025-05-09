import React from 'react';
import './About.css';

// Import main about image
import aboutImage from '../assets/images/about_image.png';

// Import about-us folder images
import childrenDoctorImage from '../assets/images/about-us/children-doctor.jpg';
import diabitiesThyroidImage from '../assets/images/about-us/diabities-thyrod-doc.jpg';
import stomachDocImage from '../assets/images/about-us/great-lever-stomach-doc.jpg';
import moreSvcImage from '../assets/images/about-us/more-svc.jpg';
import nextDoctorImage from '../assets/images/about-us/nex-doctor.jpg';
import ourSvcImage from '../assets/images/about-us/our-svc.jpg';

// Import icons
import { FaHospital, FaUserMd, FaAward, FaHandHoldingMedical, FaHeartbeat, FaCalendarCheck } from 'react-icons/fa';

function About() {
    // Stats data
    const stats = [
        { icon: <FaHospital />, count: '12+', title: 'Years of Experience' },
        { icon: <FaUserMd />, count: '150+', title: 'Expert Doctors' },
        { icon: <FaHandHoldingMedical />, count: '15,000+', title: 'Patients Treated' },
        { icon: <FaAward />, count: '25+', title: 'Awards Won' }
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
    
    // Upcoming events data
    const upcomingEvents = [
        {
            title: "Next-Gen Doctor Consultation",
            date: "Every Weekend",
            location: "Main Hospital Campus",
            image: nextDoctorImage,
            description: "Experience our innovative approach to doctor consultations with the latest telemedicine technology and personal care combined for better patient outcomes."
        },
        {
            title: "Additional Medical Services",
            date: "Daily, 9AM - 6PM",
            location: "All Hospital Branches",
            image: moreSvcImage,
            description: "We provide a range of additional services including laboratory testing, diagnostic imaging, preventive health screenings, and specialized medical consultations."
        },
        {
            title: "Community Healthcare Initiative",
            date: "Monthly, First Week",
            location: "Various Community Centers",
            image: ourSvcImage,
            description: "Our community healthcare initiative brings essential medical services to underserved areas, focusing on preventive care, health education, and basic treatments."
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
                                Since 2012, Surunga Medicine & Clinic has been your trusted partner in managing healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                            </p>
                            <p>
                                Our state-of-the-art facilities, coupled with a team of highly qualified healthcare professionals, ensure that you receive the best possible care. We believe in a patient-first approach, making sure that every interaction you have with us is comfortable, dignified, and effective.
                            </p>
                            <p>
                                Surunga Medicine & Clinic is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Surunga Medicine & Clinic is here to support you every step of the way.
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
                                We envision a future where healthcare is accessible, affordable, and personalized for everyone. By leveraging technology and human expertise, we strive to revolutionize the healthcare experience and improve health outcomes globally.
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
                            <img src={diabitiesThyroidImage} alt="Our Vision" />
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
            
            {/* Team Section */}
            <section className="about-team">
                <div className="container">
                    <div className="team-content">
                        <div className="team-image">
                            <img src={ourSvcImage} alt="Our Team" />
                        </div>
                        <div className="team-text">
                            <h2>Our Dedicated Team</h2>
                            <p>
                                Behind Surunga Medicine & Clinic is a team of dedicated professionals committed to transforming healthcare delivery. Our diverse team includes experienced healthcare providers, technology experts, and patient advocates working together to create a seamless healthcare experience.
                            </p>
                            <p>
                                Our medical professionals undergo rigorous training and continuous education to stay updated with the latest advancements in medical science. We take pride in our team's expertise, compassion, and dedication to improving patient outcomes.
                            </p>
                            <p>
                                Together, we're building a healthcare system that's more responsive, more accessible, and more human.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Events Section */}
            <section className="about-events">
                <div className="container">
                    <div className="events-header">
                        <h2>Upcoming Events & Services</h2>
                        <p>Join us for these special healthcare initiatives designed to serve our community</p>
                    </div>
                    
                    <div className="events-grid">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="event-card">
                                <div className="event-image">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div className="event-details">
                                    <h3>{event.title}</h3>
                                    <div className="event-meta">
                                        <p><strong>Date:</strong> {event.date}</p>
                                        <p><strong>Location:</strong> {event.location}</p>
                                    </div>
                                    <p className="event-description">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;