import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpcomingDoctors.css';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

// Import images from your about-us folder
import childrenDoctorImage from '../assets/images/about-us/children-doctor.jpg';
import diabitiesThyroidImage from '../assets/images/about-us/diabities-thyrod-doc.jpg';
import stomachDocImage from '../assets/images/about-us/great-lever-stomach-doc.jpg';
import nextDoctorImage from '../assets/images/about-us/nex-doctor.jpg';

function UpcomingDoctors() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();
    
    // Upcoming doctor events data with Nepali names and details
    const doctorEvents = [
        {
            id: 1,
            title: "बाल रोग विशेषज्ञ भ्रमण",
            doctor: "डा. आश्रय कडरिया",
            specialty: "बाल रोग विशेषज्ञ",
            location: "Surunga Medicine & Clinic",
            image: childrenDoctorImage,
            description: "डा. आश्रय कडरिया  बाल रोग उपचारमा १५ वर्षको अनुभव भएकी एक प्रख्यात विशेषज्ञ हुनुहुन्छ। उहाँ बाल विकास र बाल रोग प्रतिरक्षामा विशेषज्ञता राख्नुहुन्छ। उहाँको भ्रमणको समयमा, बच्चाहरूको विकास सम्बन्धी चिन्ता, खोप सल्लाह र सामान्य बाल रोगहरूको उपचारका लागि परामर्शको लागि उपलब्ध हुनुहुनेछ।",
            highlights: [
                "शिशु र बच्चाहरूको लागि विशेष हेरचाह",
                "विकास चरणको मूल्यांकन",
                "अभिभावकहरूलाई खोप मार्गदर्शन",
                "सामान्य बाल्यकालीन रोगहरूको उपचार"
            ]
        },
        {
            id: 2,
            title: "मधुमेह र थाइरोइड शिविर",
            doctor: "डा. सन्दीप चन्द श्रेष्ठ",
            specialty: "एन्डोक्रिनोलोजिस्ट",
            location: "Surunga Medicine & Clinic",
            image: diabitiesThyroidImage,
            description: "डा. सन्दीप चन्द श्रेष्ठ व्यापक मधुमेह र थाइरोइड स्क्रिनिंग र परामर्श शिविर संचालन गर्न आउनुहुनेछ। एन्डोक्राइन विकारमा उहाँको विशेषज्ञताले मधुमेह व्यवस्थापन र थाइरोइड अवस्थाहरूका लागि व्यक्तिगत उपचार योजनाहरू प्रदान गर्दछ। यो दुई दिने शिविरले बिरामीहरूलाई विशेष एन्डोक्रिनोलोजी परामर्श र फलो-अपको लागि उत्कृष्ट अवसर प्रदान गर्दछ।",
            highlights: [
                "निःशुल्क रक्त शर्करा र थाइरोइड स्क्रिनिंग",
                "विशेषज्ञसँग व्यक्तिगत परामर्श",
                "आहार र जीवनशैली सिफारिसहरू",
                "नवीनतम उपचार विकल्पहरू छलफल"
            ]
        },
        {
            id: 3,
            title: "पाचन रोग परामर्श",
            doctor: "डा. प्रमोद कुमार शाह",
            specialty: "ग्यास्ट्रोएन्टेरोलोजिस्ट",
            location: "Surunga Medicine & Clinic",
            image: stomachDocImage,
            description: "डा. प्रमोद कुमार शाह पाचन विकार र कलेजो रोगहरूमा विशेषज्ञता भएकी एक अग्रणी ग्यास्ट्रोएन्टेरोलोजिस्ट हुनुहुन्छ। उहाँको भ्रमणको समयमा, उहाँले आईबीएस, जीईआरडी, अल्सरेटिभ कोलाइटिस, क्रोहन्स डिजिज र अन्य ग्यास्ट्रोइन्टेस्टाइनल विकारहरू भएका बिरामीहरूलाई परामर्श प्रदान गर्नुहुनेछ। निदानात्मक र थेरापेटिक एन्डोस्कोपी दुवैमा उहाँको विशेषज्ञताले उहाँलाई जटिल जिआई केसहरूको लागि अत्यधिक खोजी गरिएको बनाउँछ।",
            highlights: [
                "पाचन विकार मूल्यांकन",
                "कलेजो कार्य मूल्यांकन",
                "उन्नत उपचार प्रोटोकल",
                "जिआई स्वास्थ्यको लागि पोषण मार्गदर्शन"
            ]
        },
        {
            id: 4,
            title: "बरिष्ठ हाडजोर्नी तथा मेरुदण्ड विशेषज्ञ",
            doctor: "डा. सन्तोष थापा",
            specialty: "बरिष्ठ हाडजोर्नी तथा मेरुदण्ड विशेषज्ञ",
            location: "Surunga Medicine & Clinic",
            image: nextDoctorImage,
            description: "डा. सन्तोष थापाले टेलिमेडिसिन प्रविधिको नवीनतम प्रगतिहरू प्रदर्शन गर्नुहुनेछ। यस सत्रले कसरी धेरै अवस्थाहरूको लागि टाढाको परामर्शहरू शारीरिक उपस्थितिमा गरिने भेटहरू जस्तै प्रभावकारी हुन सक्छन् भन्ने कुरा प्रदर्शन गर्नेछ। बिरामीहरूले हाम्रो नयाँ टेलिमेडिसिन प्लेटफर्म कसरी काम गर्छ र यसलाई नियमित जाँच, फलो-अप अपोइन्टमेन्ट र केही निदान मूल्यांकनहरूको लागि कसरी प्रयोग गर्न सकिन्छ भन्ने कुरा प्रत्यक्ष अनुभव गर्न सक्दछन्।",
            highlights: [
                "लाइभ टेलिमेडिसिन प्रदर्शन",
                "टाढा निदान क्षमताहरू",
                "भर्चुअल प्रिस्क्रिप्शन प्रक्रिया",
                "घरेलु स्वास्थ्य निगरानी सेटअप"
            ]
        }
    ];
    
    // Function to open event details modal
    const openEventDetails = (event) => {
        setSelectedEvent(event);
        document.body.style.overflow = 'hidden';
    };
    
    // Function to close event details modal
    const closeEventDetails = () => {
        setSelectedEvent(null);
        document.body.style.overflow = 'auto';
    };
    
    // Function to handle booking appointment
    const handleBookAppointment = () => {
        closeEventDetails(); // Close the modal first
        navigate('/Appointment'); // Navigate to appointment page
    };
    
    return (
        <section className="upcoming-doctors-section">
            <div className="container">
                <div className="upcoming-doctors-header">
                    <h2>आगामी चिकित्सक भ्रमण</h2>
                    <p>परामर्श र विशेष चिकित्सा शिविरका लागि हाम्रो सुविधामा भ्रमण गर्ने विशेषज्ञ चिकित्सकहरूसँग भेट्नुहोस्</p>
                </div>
                
                <div className="doctor-events-grid">
                    {doctorEvents.map(event => (
                        <div key={event.id} className="doctor-event-card" onClick={() => openEventDetails(event)}>
                            <div className="event-image">
                                <img src={event.image} alt={event.title} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                            </div>
                            
                            <div className="event-details">
                                <h3 className="text-center">{event.title}</h3>
                                <p className="doctor-name text-center">{event.doctor}</p>
                                <p className="doctor-specialty text-center"><strong>{event.specialty}</strong></p>
                                
                                <div className="event-info">
                                    <div className="info-item">
                                        <FaMapMarkerAlt className="info-icon" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                
                                <button className="read-more-btn">थप पढ्नुहोस्</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="event-modal">
                    <div className="modal-overlay" onClick={closeEventDetails}></div>
                    <div className="modal-content">
                        <button className="modal-close" onClick={closeEventDetails}>
                            <FaTimes />
                        </button>
                        
                        <div className="modal-image-container">
                            <img 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title} 
                                className="modal-image"
                            />
                        </div>
                        
                        <div className="modal-body">
                            <div className="modal-title-area">
                                <h2 className="text-center">{selectedEvent.title}</h2>
                                <p className="modal-doctor text-center">
                                    {selectedEvent.doctor} <span className="text-center"><strong>({selectedEvent.specialty})</strong></span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="modal-body">
                            <div className="modal-info-grid">
                                <div className="modal-info-item">
                                    <FaMapMarkerAlt className="modal-info-icon" />
                                    <div>
                                        <h4>स्थान</h4>
                                        <p>{selectedEvent.location}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-description">
                                <h3>यस कार्यक्रमको बारेमा</h3>
                                <p>{selectedEvent.description}</p>
                            </div>
                            
                            <div className="modal-highlights">
                                <h3>विशेषताहरू</h3>
                                <ul>
                                    {selectedEvent.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="modal-cta">
                                <button 
                                    className="book-appointment-btn" 
                                    onClick={handleBookAppointment}
                                >
                                    Book Appointment Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default UpcomingDoctors;