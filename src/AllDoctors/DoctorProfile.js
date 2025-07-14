import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserMd, 
    faGraduationCap, 
    faArrowLeft, 
    faMapMarkerAlt,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../Context/AppContext';
import './DoctorProfile.css';

const DoctorProfile = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('about');
    const navigate = useNavigate();
    
    // Get doctors from context
    const { doctors } = useContext(AppContext);
    
    useEffect(() => {
        // Find doctor by ID
        const foundDoctor = doctors.find(doc => doc._id === id);
        if (foundDoctor) {
            setDoctor(foundDoctor);
        }
        setLoading(false);
        
        // Scroll to top on page load
        window.scrollTo(0, 0);
    }, [id, doctors]);
    
    // Function to handle booking appointment
    const handleBookAppointment = () => {
        // Navigate to appointment page with doctor info and scroll to top
        navigate('/appointment', { 
            state: { 
                selectedDoctor: doctor.name,
                doctorId: doctor._id
            } 
        });
        // Scroll to top immediately
        window.scrollTo(0, 0);
    };
    
    // Function to format about text with line breaks
    const formatAboutText = (text) => {
        if (!text) return '';
        
        // Split text by common patterns that should be new paragraphs
        const paragraphs = text.split(/(?=Note:|नोट:|विशेष:|महत्वपूर्ण:|सूचना:)/);
        
        return paragraphs.map((paragraph, index) => (
            <p key={index} className="about-paragraph">
                {paragraph.trim()}
            </p>
        ));
    };
    
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading doctor profile...</p>
            </div>
        );
    }
    
    if (!doctor) {
        return (
            <div className="not-found-container">
                <h2>Doctor Not Found</h2>
                <p>We couldn't find the doctor you're looking for.</p>
                <Link to="/doctors" className="back-btn">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to All Doctors
                </Link>
            </div>
        );
    }
    
    return (
        <section className="doctor-profile-section">
            <div className="container">
                <div className="back-link">
                    <Link to="/doctors" className="back-btn">
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to All Doctors
                    </Link>
                </div>
                
                <div className="profile-container">
                    <div className="row">
                        {/* Doctor info card */}
                        <div className="col-12 col-lg-4">
                            <div className="doctor-info-card">
                                <div className="doctor-profile-image">
                                    <img src={doctor.image} alt={doctor.name} className="img-fluid" />
                                </div>
                                
                                <div className="doctor-profile-info">
                                    <h2 className="doctor-profile-name text-center">{doctor.name}</h2>
                                    <p className="doctor-profile-specialty text-center"><strong>{doctor.speciality}</strong></p>
                                    
                                    <div className="doctor-stats text-center">
                                        <div className="stat-item justify-content-center">
                                            <FontAwesomeIcon icon={faUserMd} />
                                            <div className="stat-content">
                                                <span className="stat-label">Experience</span>
                                                <span className="stat-value">{doctor.experience}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="availability-info text-center">
                                        <h3 className="info-heading">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
                                        </h3>
                                        <div className="address">
                                            <p>{doctor.address.line1}</p>
                                            <p>{doctor.address.line2}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="qualification-info text-center">
                                        <h3 className="info-heading">
                                            <FontAwesomeIcon icon={faGraduationCap} /> Qualification
                                        </h3>
                                        <p className="qualification-text">{doctor.degree}</p>
                                    </div>
                                    
                                    <button className="book-appointment-btn" onClick={handleBookAppointment}>
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Doctor details tabs */}
                        <div className="col-12 col-lg-8">
                            <div className="doctor-details-tabs">
                                <div className="tabs-header">
                                    <div 
                                        className={`tab-item ${selectedTab === 'about' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('about')}
                                    >
                                        About
                                    </div>
                                    <div 
                                        className={`tab-item ${selectedTab === 'services' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('services')}
                                    >
                                        Services
                                    </div>
                                    <div 
                                        className={`tab-item ${selectedTab === 'location' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('location')}
                                    >
                                        Location
                                    </div>
                                </div>
                                
                                <div className="tabs-content">
                                    {selectedTab === 'about' && (
                                        <div className="tab-content-about">
                                            <h3 className="tab-title">About {doctor.name}</h3>
                                            <div className="about-text">
                                                {formatAboutText(doctor.about)}
                                            </div>
                                            
                                            <div className="expertise-section">
                                                <h4 className="section-title">Specialties</h4>
                                                <ul className="expertise-list">
                                                    {doctor.specialties && doctor.specialties.map((specialty, index) => (
                                                        <li key={index}>
                                                            <FontAwesomeIcon icon={faCheck} /> {specialty}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {selectedTab === 'services' && (
                                        <div className="tab-content-services">
                                            <h3 className="tab-title">Services Offered</h3>
                                            <div className="services-list">
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Consultation</h4>
                                                        <p>Comprehensive health consultations and medical evaluations</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Diagnostics</h4>
                                                        <p>Advanced diagnostic procedures and health assessments</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Treatment</h4>
                                                        <p>Specialized treatment plans tailored to individual needs</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Follow-up Care</h4>
                                                        <p>Continuous monitoring and follow-up appointments</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {selectedTab === 'location' && (
                                        <div className="tab-content-location">
                                            <h3 className="tab-title">Location</h3>
                                            <div className="location-info">
                                                <div className="address-block">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                                    <div>
                                                        <h4>Office Address</h4>
                                                        <p>{doctor.address.line1}</p>
                                                        <p>{doctor.address.line2}</p>
                                                    </div>
                                                </div>
                                                <div className="map-container">
                                                    <iframe 
                                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.9019377351285!2d87.88773391503809!3d26.641108883262635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5bdaf65d8032f%3A0x60111939f874a53c!2sSurunga%20medicine%20center%20%26%20chandrodaya%20clinic!5e0!3m2!1sen!2sus!4v1588442696675!5m2!1sen!2sus" 
                                                        width="100%" 
                                                        height="450" 
                                                        style={{ border: 0 }} 
                                                        allowFullScreen="" 
                                                        loading="lazy"
                                                        title="Doctor Location Map"
                                                        className="location-map">
                                                    </iframe>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorProfile;