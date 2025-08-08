import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserMd, 
    faGraduationCap, 
    faArrowLeft, 
    faMapMarkerAlt,
    faCheck,
    faClock,
    faCalendarCheck,
    faPhone,
    faStethoscope
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
    const { doctors, isDoctorAvailableOnDate, getDoctorAvailableSlots } = useContext(AppContext);
    
    useEffect(() => {
        // Find doctor by ID
        const foundDoctor = doctors.find(doc => doc._id === id);
        if (foundDoctor) {
            setDoctor(foundDoctor);
        }
        setLoading(false);
        
        // Scroll to top on page load
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, doctors]);
    
    // Function to handle booking appointment
    const handleBookAppointment = () => {
        // Navigate to appointment page with doctor info
        navigate('/appointment', { 
            state: { 
                selectedDoctor: doctor.name,
                doctorId: doctor._id
            } 
        });
        // Scroll to top immediately
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Function to format availability for display
    const formatAvailability = (availability) => {
        if (!availability) {
            return (
                <div className="no-availability">
                    <p>Availability schedule not configured. Please contact the clinic for appointment scheduling.</p>
                    <div className="clinic-contact">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>023-553097 / 9804964107</span>
                    </div>
                </div>
            );
        }

        const dayDisplayNames = {
            'monday': 'Monday',
            'tuesday': 'Tuesday',
            'wednesday': 'Wednesday',
            'thursday': 'Thursday',
            'friday': 'Friday',
            'saturday': 'Saturday',
            'sunday': 'Sunday'
        };

        const hasAvailableDates = availability.availableDates && availability.availableDates.length > 0;
        const hasDaySchedule = availability.days && Object.keys(availability.days).some(
            day => availability.days[day] && availability.days[day].length > 0
        );

        return (
            <div className="availability-info">
                {/* Show availability note if exists */}
                {availability.note && (
                    <div className="availability-note-banner">
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        <span>{availability.note}</span>
                    </div>
                )}

                {/* Show specific available dates if provided */}
                {hasAvailableDates && (
                    <div className="specific-dates-section">
                        <h4 className="availability-section-title">
                            <FontAwesomeIcon icon={faCalendarCheck} />
                            Upcoming Available Dates
                        </h4>
                        <div className="available-dates-grid">
                            {availability.availableDates
                                .slice(0, 12) // Show first 12 dates
                                .map(dateStr => {
                                    const date = new Date(dateStr);
                                    const dayName = dayDisplayNames[getDayName(date)];
                                    const isToday = date.toDateString() === new Date().toDateString();
                                    const isPast = date < new Date();
                                    
                                    if (isPast) return null;
                                    
                                    const formattedDate = date.toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                                    });
                                    
                                    const timeSlots = availability.days && availability.days[getDayName(date)] 
                                        ? availability.days[getDayName(date)] 
                                        : [];
                                    
                                    return (
                                        <div key={dateStr} className={`available-date-card ${isToday ? 'today' : ''}`}>
                                            <div className="date-header">
                                                <span className="date-display">{formattedDate}</span>
                                                <span className="day-display">{dayName}</span>
                                                {isToday && <span className="today-badge">Today</span>}
                                            </div>
                                            {timeSlots.length > 0 && (
                                                <div className="time-slots-preview">
                                                    {timeSlots.slice(0, 3).map(time => (
                                                        <span key={time} className="time-slot-mini">{time}</span>
                                                    ))}
                                                    {timeSlots.length > 3 && (
                                                        <span className="more-times">+{timeSlots.length - 3} more</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }).filter(Boolean)}
                            {availability.availableDates.length > 12 && (
                                <div className="more-dates-card">
                                    <FontAwesomeIcon icon={faCalendarCheck} />
                                    <span>+{availability.availableDates.length - 12} more dates</span>
                                    <small>Book appointment to see all</small>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Show day-based schedule if no specific dates or as additional info */}
                {hasDaySchedule && (
                    <div className="day-based-schedule">
                        <h4 className="availability-section-title">
                            <FontAwesomeIcon icon={faClock} />
                            {hasAvailableDates ? 'Time Schedule' : 'Weekly Schedule'}
                        </h4>
                        <div className="weekly-schedule-grid">
                            {Object.keys(availability.days)
                                .filter(day => availability.days[day] && availability.days[day].length > 0)
                                .map(day => (
                                    <div key={day} className="schedule-day-card">
                                        <h5 className="day-name">{dayDisplayNames[day]}</h5>
                                        <div className="time-slots-display">
                                            {availability.days[day].map(time => (
                                                <span key={time} className="time-slot-badge">
                                                    {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* If neither exists */}
                {!hasAvailableDates && !hasDaySchedule && (
                    <div className="no-schedule">
                        <FontAwesomeIcon icon={faCalendarCheck} />
                        <p>Schedule will be available soon. Please contact clinic for appointments.</p>
                        <div className="clinic-contact">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>023-553097 / 9804964107</span>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Helper function to get day name from date
    const getDayName = (date) => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[date.getDay()];
    };

    // Function to get next few available dates for quick display
    const getQuickAvailability = () => {
        if (!doctor || !doctor.availability) return null;

        const today = new Date();
        const nextDays = [];
        
        // Check next 14 days for availability
        for (let i = 0; i < 14; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() + i);
            
            try {
                if (isDoctorAvailableOnDate && isDoctorAvailableOnDate(doctor._id, checkDate)) {
                    const slots = getDoctorAvailableSlots ? getDoctorAvailableSlots(doctor._id, checkDate) : [];
                    if (slots.length > 0) {
                        nextDays.push({
                            date: checkDate,
                            slots: slots.length
                        });
                        if (nextDays.length >= 3) break; // Show only next 3 available days
                    }
                }
            } catch (error) {
                console.error('Error checking availability:', error);
            }
        }

        return nextDays;
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

    const quickAvailability = getQuickAvailability();
    
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
                                    <p className="doctor-profile-specialty text-center">
                                        <FontAwesomeIcon icon={faStethoscope} />
                                        <strong>{doctor.speciality}</strong>
                                    </p>
                                    
                                    <div className="doctor-stats text-center">
                                        <div className="stat-item justify-content-center">
                                            <FontAwesomeIcon icon={faUserMd} />
                                            <div className="stat-content">
                                                <span className="stat-label">Experience</span>
                                                <span className="stat-value">{doctor.experience}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="info-section">
                                        <h3 className="info-heading">
                                            <FontAwesomeIcon icon={faGraduationCap} /> Qualification
                                        </h3>
                                        <p className="qualification-text">{doctor.degree}</p>
                                    </div>

                                    <div className="info-section">
                                        <h3 className="info-heading">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
                                        </h3>
                                        <div className="address">
                                            <p>{doctor.address.line1}</p>
                                            <p>{doctor.address.line2}</p>
                                        </div>
                                    </div>

                                    {/* Quick Availability Summary */}
                                    {quickAvailability && quickAvailability.length > 0 && (
                                        <div className="quick-availability-summary">
                                            <h3 className="info-heading">
                                                <FontAwesomeIcon icon={faClock} /> Next Available
                                            </h3>
                                            <div className="next-available-dates">
                                                {quickAvailability.map((avail, index) => (
                                                    <div key={index} className="next-date-item">
                                                        <span className="next-date">
                                                            {avail.date.toLocaleDateString('en-US', { 
                                                                month: 'short', 
                                                                day: 'numeric' 
                                                            })}
                                                        </span>
                                                        <span className="next-slots">{avail.slots} slots</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <button className="book-appointment-btn" onClick={handleBookAppointment}>
                                        <FontAwesomeIcon icon={faCalendarCheck} />
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
                                        className={`tab-item ${selectedTab === 'availability' ? 'active' : ''}`}
                                        onClick={() => setSelectedTab('availability')}
                                    >
                                        Availability
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
                                            
                                            {doctor.specialties && doctor.specialties.length > 0 && (
                                                <div className="expertise-section">
                                                    <h4 className="section-title">Areas of Expertise</h4>
                                                    <ul className="expertise-list">
                                                        {doctor.specialties.map((specialty, index) => (
                                                            <li key={index}>
                                                                <FontAwesomeIcon icon={faCheck} /> {specialty}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {selectedTab === 'availability' && (
                                        <div className="tab-content-availability">
                                            <h3 className="tab-title">Doctor's Availability Schedule</h3>
                                            <div className="detailed-availability">
                                                {formatAvailability(doctor.availability)}
                                                <div className="booking-call-to-action">
                                                    <div className="cta-box">
                                                        <FontAwesomeIcon icon={faCalendarCheck} className="cta-icon" />
                                                        <div className="cta-content">
                                                            <h4>Ready to Schedule?</h4>
                                                            <p>Click "Book Appointment" to see real-time availability and secure your preferred time slot.</p>
                                                            <button className="inline-book-btn" onClick={handleBookAppointment}>
                                                                <FontAwesomeIcon icon={faCalendarCheck} />
                                                                Book Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        <h4>Medical Consultation</h4>
                                                        <p>Comprehensive health consultations and medical evaluations tailored to your specific needs</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Diagnostic Services</h4>
                                                        <p>Advanced diagnostic procedures and health assessments using modern medical equipment</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Treatment Planning</h4>
                                                        <p>Personalized treatment plans designed for optimal health outcomes and patient comfort</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Follow-up Care</h4>
                                                        <p>Continuous monitoring and follow-up appointments to ensure treatment effectiveness</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Preventive Care</h4>
                                                        <p>Health screening and preventive measures to maintain optimal health and prevent diseases</p>
                                                    </div>
                                                </div>
                                                <div className="service-item">
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <div>
                                                        <h4>Patient Education</h4>
                                                        <p>Educational guidance on health management, lifestyle modifications, and treatment compliance</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {selectedTab === 'location' && (
                                        <div className="tab-content-location">
                                            <h3 className="tab-title">Clinic Location</h3>
                                            <div className="location-info">
                                                <div className="address-block">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
                                                    <div>
                                                        <h4>Office Address</h4>
                                                        <p>{doctor.address.line1}</p>
                                                        <p>{doctor.address.line2}</p>
                                                        <div className="contact-info">
                                                            <FontAwesomeIcon icon={faPhone} />
                                                            <span>023-553097 / 9804964107</span>
                                                        </div>
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