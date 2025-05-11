import React from 'react';
import './Services.css';
import { 
    FaUserMd, 
    FaCalendarCheck, 
    FaHospital, 
    FaHeartbeat, 
    FaAmbulance, 
    FaPrescriptionBottleAlt 
} from "react-icons/fa";

function Services() {
    const servicesData = [
        {
            icon: <FaUserMd />,
            title: "Expert Doctors",
            description: "हाम्रा अत्यधिक योग्य र अनुभवी चिकित्सकहरूसँग विशेष परामर्श प्राप्त गर्नुहोस्।"
        },
        {
            icon: <FaCalendarCheck />,
            title: "Easy Scheduling",
            description: "जुनसुकै समयमा अनलाइन भेटघाट बुक गर्नुहोस् र तुरुन्तै पुष्टिकरण प्राप्त गर्नुहोस्।"
        },
        {
            icon: <FaHospital />,
            title: "Virtual Visits",
            description: "सुरक्षित भिडियो परामर्श मार्फत टाढाबाट चिकित्सकहरूसँग जोडिनुहोस्।"
        },
        {
            icon: <FaHeartbeat />,
            title: "Health Monitoring",
            description: "आफ्नो स्वास्थ्य मापदण्डहरू ट्र्याक गर्नुहोस् र व्यक्तिगत सल्लाह प्राप्त गर्नुहोस्।"
        },
        {
            icon: <FaAmbulance />,
            title: "Emergency Care",
            description: "२४/७ आकस्मिक सहयोग र जटिल अवस्थाहरूका लागि द्रुत प्रतिक्रिया।"
        },
        {
            icon: <FaPrescriptionBottleAlt />,
            title: "Prescription Refills",
            description: "अनावश्यक व्यक्तिगत भेटघाट बिना औषधि पर्चाहरू सजिलै नवीकरण गर्नुहोस्।"
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