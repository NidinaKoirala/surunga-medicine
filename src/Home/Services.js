import React from 'react';
import './Services.css';
import {
    FaVideo,
    FaXRay,
    FaHospital,
    FaHeartbeat,
    FaSyringe,
    FaUsers,
    FaPills,
    FaFlask
} from "react-icons/fa";

function Services() {
    const servicesData = [
        {
            icon: <FaVideo />,
            title: "Video X-ray",
            description: "Advanced digital X-ray services with real-time video guidance for accurate diagnostics."
        },
        {
            icon: <FaXRay />,
            title: "X-ray",
            description: "Digital X-ray imaging services with high-quality results and quick processing."
        },
        {
            icon: <FaHospital />,
            title: "OPD",
            description: "Comprehensive Outpatient Department services with experienced doctors across specialties."
        },
        {
            icon: <FaHeartbeat />,
            title: "USG",
            description: "Ultrasonography services with modern equipment for detailed internal body imaging."
        },
        {
            icon: <FaHeartbeat />,
            title: "ECG",
            description: "Electrocardiogram testing for heart health monitoring and cardiac condition diagnosis."
        },
        {
            icon: <FaSyringe />,
            title: "Vaccination",
            description: "Complete vaccination services for all age groups with safe and effective immunization."
        },
        {
            icon: <FaUsers />,
            title: "Family Planning Counselling",
            description: "Professional counselling and guidance for family planning and reproductive health."
        },
        {
            icon: <FaPills />,
            title: "Pharmacy",
            description: "On-site pharmacy with a wide range of medications and expert pharmacist advice."
        },
        {
            icon: <FaFlask />,
            title: "Lab Tests",
            description: "Comprehensive laboratory testing services with state-of-the-art equipment and accurate results.",
            isLabTests: true
        }
    ];

    const scrollToLabTests = () => {
        const labTestsSection = document.getElementById('lab-tests-section');
        if (labTestsSection) {
            labTestsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="services-header">
                    <h2>Our Services</h2>
                    <p>Comprehensive healthcare solutions designed for your convenience and well-being</p>
                </div>
                
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div 
                            key={index} 
                            className={`service-card ${service.isLabTests ? 'clickable-card' : ''}`}
                            onClick={service.isLabTests ? scrollToLabTests : undefined}
                        >
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            {service.isLabTests && (
                                <div className="click-indicator">
                                    <span>Click to view tests</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;