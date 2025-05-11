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
        { icon: <FaHospital />, count: '12+', title: 'वर्षको अनुभव' },
        { icon: <FaUserMd />, count: '150+', title: 'विशेषज्ञ चिकित्सकहरू' },
        { icon: <FaHandHoldingMedical />, count: '15,000+', title: 'उपचारित बिरामीहरू' },
        { icon: <FaAward />, count: '25+', title: 'प्राप्त पुरस्कारहरू' }
    ];
    
    // Specialized services data
    const specializedServices = [
        {
            title: "बाल रोग विशेषज्ञ सेवा",
            description: "हाम्रो विशेष बाल रोग विभागले शिशुदेखि किशोरावस्थासम्मका सबै उमेरका बच्चाहरूलाई अत्याधुनिक सुविधा र बाल-मैत्री वातावरणमा व्यापक स्याहार प्रदान गर्दछ।",
            image: childrenDoctorImage
        },
        {
            title: "मधुमेह र थाइरोइड व्यवस्थापन",
            description: "हाम्रो एन्डोक्रिनोलोजी विभागले मधुमेह र थाइरोइड विकारहरूका लागि व्यक्तिगत उपचार योजना र उत्तम स्वास्थ्य परिणामका लागि निरन्तर अनुगमनका साथ विशेष स्याहार प्रदान गर्दछ।",
            image: diabitiesThyroidImage
        },
        {
            title: "ग्यास्ट्रोएन्टेरोलोजी सेवाहरू",
            description: "हाम्रा ग्यास्ट्रोएन्टेरोलोजी विशेषज्ञहरूले उन्नत निदान उपकरण र प्रमाणमा आधारित उपचार पद्धतिहरू प्रयोग गरेर पाचन प्रणालीका विभिन्न विकारहरूको निदान र उपचार गर्दछन्।",
            image: stomachDocImage
        }
    ];
    
    // Upcoming events data
    const upcomingEvents = [
        {
            title: "नयाँ-युग चिकित्सक परामर्श",
            date: "प्रत्येक सप्ताहान्त",
            location: "सुरुङ्गा मेडिसिन एण्ड क्लिनिक",
            image: nextDoctorImage,
            description: "बिरामीको उत्तम परिणामका लागि हाम्रो नवीनतम टेलिमेडिसिन प्रविधि र व्यक्तिगत स्याहार संयोजन गरिएको चिकित्सक परामर्शको अभिनव दृष्टिकोण अनुभव गर्नुहोस्।"
        },
        {
            title: "अतिरिक्त चिकित्सकीय सेवाहरू",
            date: "दैनिक, बिहान ९ बजेदेखि बेलुका ६ बजेसम्म",
            location: "सुरुङ्गा मेडिसिन एण्ड क्लिनिक",
            image: moreSvcImage,
            description: "हामी प्रयोगशाला परीक्षण, निदान इमेजिङ, रोकथाम स्वास्थ्य स्क्रिनिङ, र विशेष चिकित्सा परामर्श लगायत थप सेवाहरूको श्रृंखला प्रदान गर्दछौं।"
        },
        {
            title: "समुदाय स्वास्थ्य सेवा पहल",
            date: "मासिक, पहिलो हप्ता",
            location: "सुरुङ्गा मेडिसिन एण्ड क्लिनिक",
            image: ourSvcImage,
            description: "हाम्रो समुदाय स्वास्थ्य सेवा पहलले सेवा नपुगेका क्षेत्रहरूमा आवश्यक चिकित्सकीय सेवाहरू पुर्याउँछ, जसमा रोकथाम स्याहार, स्वास्थ्य शिक्षा, र आधारभूत उपचारहरूमा ध्यान केन्द्रित गरिएको छ।"
        }
    ];
    
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1>हाम्रो बारेमा</h1>
                        <p>स्वास्थ्य सेवामा उत्कृष्टताको प्रतिबद्धता</p>
                    </div>
                </div>
                <div className="hero-overlay"></div>
            </section>
            
            {/* Main About Section */}
            <section className="about-main">
                <div className="container">
                    <div className="about-content">
                        <div className="about-image">
                            <img src={aboutImage} alt="सुरुङ्गा मेडिसिन एण्ड क्लिनिकको बारेमा" />
                        </div>
                        <div className="about-text">
                            <h2>सुरुङ्गा मेडिसिन एण्ड क्लिनिकमा स्वागत छ</h2>
                            <p>
                                2073 देखि, सुरुङ्गा मेडिसिन एण्ड क्लिनिक कंकाई-०३, झापामा तपाईंको स्वास्थ्य सेवा आवश्यकताहरू सहज र कुशलतापूर्वक व्यवस्थापन गर्ने तपाईंको विश्वासिलो साझेदार रहँदै आएको छ। हामी व्यक्तिहरूले चिकित्सक अपोइन्टमेन्ट तय गर्दा र आफ्नो स्वास्थ्य रेकर्ड व्यवस्थापन गर्दा आइपर्ने चुनौतीहरू बुझ्दछौं।
                            </p>
                            <p>
                                हाम्रो अत्याधुनिक सुविधाहरू, उच्च योग्य स्वास्थ्य पेशेवरहरूको टिमका साथ, तपाईंले सम्भव भएसम्म उत्तम स्याहार प्राप्त गर्नुहुनेछ भनी सुनिश्चित गर्दछ। हामी बिरामी-प्रथम दृष्टिकोणमा विश्वास गर्दछौं, तपाईंले हामीसँग गर्ने हरेक अन्तरक्रिया आरामदायक, मर्यादित, र प्रभावकारी छ भनी सुनिश्चित गर्दछौं।
                            </p>
                            <p>
                                सुरुङ्गा मेडिसिन एण्ड क्लिनिक स्वास्थ्य सेवा प्रविधिमा उत्कृष्टताको लागि प्रतिबद्ध छ। हामी प्रयोगकर्ता अनुभव सुधार र उत्कृष्ट सेवा प्रदान गर्न नवीनतम प्रगतिहरू एकीकृत गर्दै हाम्रो प्लेटफर्म बढाउन निरन्तर प्रयास गर्दछौं। तपाईं आफ्नो पहिलो अपोइन्टमेन्ट बुक गर्दै हुनुहुन्छ वा चलिरहेको स्याहार व्यवस्थापन गर्दै हुनुहुन्छ, सुरुङ्गा मेडिसिन एण्ड क्लिनिक हरेक कदममा तपाईंलाई समर्थन गर्न यहाँ छ।
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
                            <h2>हाम्रो दृष्टिकोण</h2>
                            <p>
                                सुरुङ्गा मेडिसिन एण्ड क्लिनिकमा हाम्रो दृष्टिकोण प्रत्येक बिरामीका लागि निर्बाध स्वास्थ्य सेवा अनुभव सिर्जना गर्नु हो। हामी बिरामीहरू र स्वास्थ्य सेवा प्रदायकहरूबीचको अन्तर पूरा गर्न, तपाईंलाई आवश्यक परेको बेला आवश्यक स्याहार प्राप्त गर्न सहज बनाउँदै लक्षित छौं।
                            </p>
                            <p>
                                हामी एउटा भविष्य कल्पना गर्दछौं जहाँ स्वास्थ्य सेवा सबैका लागि पहुँचयोग्य, किफायती, र व्यक्तिगत हुन्छ। प्रविधि र मानव विशेषज्ञता उपयोग गरेर, हामी स्वास्थ्य सेवा अनुभवलाई क्रान्तिकारी बनाउन र विश्वव्यापी स्वास्थ्य परिणामहरू सुधार गर्न प्रयासरत छौं।
                            </p>
                            <div className="vision-points">
                                <div className="vision-point">
                                    <FaHeartbeat className="point-icon" />
                                    <div>
                                        <h4>बिरामी-केन्द्रित स्याहार</h4>
                                        <p>हामीले गर्ने हरेक कुरामा बिरामीहरूलाई पहिलो स्थानमा राख्ने</p>
                                    </div>
                                </div>
                                <div className="vision-point">
                                    <FaCalendarCheck className="point-icon" />
                                    <div>
                                        <h4>पहुँचयोग्य स्वास्थ्य सेवा</h4>
                                        <p>गुणस्तरीय स्वास्थ्य सेवा सबैका लागि उपलब्ध बनाउने</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vision-image">
                            <img src={diabitiesThyroidImage} alt="हाम्रो दृष्टिकोण" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Specialized Services Section */}
            <section className="about-services">
                <div className="container">
                    <div className="services-header">
                        <h2>हाम्रा विशेष सेवाहरू</h2>
                        <p>हामी विशिष्ट स्वास्थ्य सेवा आवश्यकताहरू सम्बोधन गर्न विशेष सेवाहरूको श्रृंखला प्रदान गर्दछौं</p>
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
                            <img src={ourSvcImage} alt="हाम्रो टीम" />
                        </div>
                        <div className="team-text">
                            <h2>हाम्रो समर्पित टीम</h2>
                            <p>
                                सुरुङ्गा मेडिसिन एण्ड क्लिनिकको पछाडि स्वास्थ्य सेवा वितरण परिवर्तन गर्न प्रतिबद्ध समर्पित पेशेवरहरूको टोली छ। हाम्रो विविध टीममा निर्बाध स्वास्थ्य सेवा अनुभव सिर्जना गर्न एकसाथ काम गर्ने अनुभवी स्वास्थ्य सेवा प्रदायकहरू, प्रविधि विशेषज्ञहरू, र बिरामी वकिलहरू समावेश छन्।
                            </p>
                            <p>
                                हाम्रा चिकित्सा पेशेवरहरूले चिकित्सा विज्ञानमा नवीनतम प्रगतिहरूसँग अद्यावधिक रहन कठोर प्रशिक्षण र निरन्तर शिक्षा प्राप्त गर्दछन्। हामी हाम्रो टीमको विशेषज्ञता, करुणा, र बिरामी परिणामहरू सुधार गर्ने प्रतिबद्धतामा गर्व गर्दछौं।
                            </p>
                            <p>
                                एकसाथ, हामी स्वास्थ्य सेवा प्रणाली निर्माण गर्दैछौं जुन अधिक प्रतिक्रियाशील, अधिक पहुँचयोग्य, र अधिक मानवीय छ।
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Events Section */}
            <section className="about-events">
                <div className="container">
                    <div className="events-header">
                        <h2>आगामी कार्यक्रम र सेवाहरू</h2>
                        <p>हाम्रो समुदायलाई सेवा गर्न डिजाइन गरिएका यी विशेष स्वास्थ्य सेवा पहलहरूमा सहभागी हुनुहोस्</p>
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
                                        <p><strong>मिति:</strong> {event.date}</p>
                                        <p><strong>स्थान:</strong> {event.location}</p>
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