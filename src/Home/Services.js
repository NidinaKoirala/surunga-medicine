import React from 'react';
import './Services.css';
import { 
    FaUserMd, 
    FaCalendarCheck, 
    FaFlask,
    FaAmbulance, 
    FaPills 
} from "react-icons/fa";

function Services() {
    const servicesData = [
        {
            icon: <FaUserMd />,
            title: "Expert Doctors",
            description: "Get consultations from our highly qualified and experienced medical professionals."
        },
        {
            icon: <FaCalendarCheck />,
            title: "Easy Scheduling",
            description: "Book appointments online anytime and receive instant confirmations."
        },
        {
            icon: <FaAmbulance />,
            title: "Emergency Care",
            description: "24/7 emergency support and quick response for critical situations."
        },
        {
            icon: <FaFlask />,
            title: "Lab Services",
            description: "State-of-the-art laboratory testing with quick and accurate results."
        },
        {
            icon: <FaPills />,
            title: "Pharmacy",
            description: "On-site pharmacy with a wide range of medications and expert pharmacist advice."
        }
    ];
    
    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="services-header">
                    <h2>Our Services</h2>
                    <p>Comprehensive healthcare solutions designed for your convenience and well-being</p>
                </div>
                
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;