import React from 'react';
import './Services.css';
import { FaUserMd, FaCalendarCheck, FaHospital, FaHeartbeat, FaAmbulance, FaPrescriptionBottleAlt } from "react-icons/fa";

function Services() {
    const servicesData = [
        {
            icon: <FaUserMd size={40} />,
            title: "Expert Doctors",
            description: "Get consultations from our highly qualified and experienced medical professionals."
        },
        {
            icon: <FaCalendarCheck size={40} />,
            title: "Easy Scheduling",
            description: "Book appointments online anytime and receive instant confirmations."
        },
        {
            icon: <FaHospital size={40} />,
            title: "Virtual Visits",
            description: "Connect with doctors remotely through secure video consultations."
        },
        {
            icon: <FaHeartbeat size={40} />,
            title: "Health Monitoring",
            description: "Keep track of your health metrics and receive personalized advice."
        },
        {
            icon: <FaAmbulance size={40} />,
            title: "Emergency Care",
            description: "24/7 emergency support and quick response for critical situations."
        },
        {
            icon: <FaPrescriptionBottleAlt size={40} />,
            title: "Prescription Refills",
            description: "Easy renewal of prescriptions without unnecessary in-person visits."
        }
    ];

    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="services-header text-center">
                    <h2>Our Services</h2>
                    <p className="services-subtitle">Comprehensive healthcare solutions designed for your convenience and well-being</p>
                </div>
                <div className="row">
                    {servicesData.map((service, index) => (
                        <div key={index} className="col-md-4 col-sm-6 mb-4">
                            <div className="service-card">
                                <div className="service-icon">
                                    {service.icon}
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                                <a href="#" className="service-link">Learn more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;