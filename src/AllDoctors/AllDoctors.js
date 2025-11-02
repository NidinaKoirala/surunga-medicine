import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AllDoctors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faCalendarPlus, faChevronDown, faStethoscope, faUserCheck , faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../Context/AppContext';

function AllDoctors() {
    // useParams for accessing parameter
    const { speciality } = useParams();
    
    // create navigate const to navigate different link
    const navigate = useNavigate();
    
    // create useState for storing doctors Data
    const [filterDoc, setFilterDoc] = useState([]);
    
    // state for search functionality
    const [searchTerm, setSearchTerm] = useState('');
    
    // state for active specialty
    const [activeSpecialty, setActiveSpecialty] = useState(speciality || '');
    
    // state for dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Use context to get doctors and specialityData
    const { doctors, specialityData, getNextAvailableDate } = useContext(AppContext);
    
    // Function to get a brief availability summary for display
    const getAvailabilitySummary = (doctor) => {
        if (!doctor.availability || !doctor.availability.days) {
            return { text: 'Check availability', type: 'unavailable' };
        }

        // Get next available date
        const nextDate = getNextAvailableDate(doctor._id);
        if (!nextDate) {
            return { text: 'No slots', type: 'unavailable' };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        // Check if today
        if (nextDate.toDateString() === today.toDateString()) {
            return { text: 'Today', type: 'today' };
        }
        
        // Check if tomorrow
        if (nextDate.toDateString() === tomorrow.toDateString()) {
            return { text: 'Tomorrow', type: 'tomorrow' };
        }

        // Calculate days from now
        const diffTime = Math.abs(nextDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 7) {
            // Within a week - show day name
            const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
            return { text: dayName, type: 'week' };
        }

        // More than a week - show date
        const dateStr = nextDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
        
        return { text: dateStr, type: 'future' };
    };
    
    // create function to filter doctors according to specialty and search term
    useEffect(() => {
        const applyFilter = () => {
            let filteredDoctors = doctors;
            
            // Filter by specialty if provided
            if (speciality) {
                filteredDoctors = doctors.filter(doc => doc.speciality === speciality);
                setActiveSpecialty(speciality);
            } else if (!speciality && !searchTerm) {
                filteredDoctors = doctors;
                setActiveSpecialty('');
            }
            
            // Apply search filter if search term exists
            if (searchTerm) {
                filteredDoctors = filteredDoctors.filter(doc => 
                    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            
            setFilterDoc(filteredDoctors);
        };
        
        applyFilter();
    }, [doctors, speciality, searchTerm]);
    
    // Function to handle specialty change
    const handleSpecialtyChange = (newSpecialty) => {
        if (activeSpecialty === newSpecialty) {
            navigate('/doctors');
            setActiveSpecialty('');
        } else {
            navigate(`/doctors/${newSpecialty}`);
            setActiveSpecialty(newSpecialty);
        }
        setIsDropdownOpen(false);
    };
    
    // Function to navigate to doctor profile
    const navigateToProfile = (doctorId) => {
        navigate(`/doctor/${doctorId}`);
    };
    
    // Function to handle booking appointment
    const handleBookAppointment = (e, doctor) => {
        e.stopPropagation(); // Prevent card click event from triggering
        // Convert to lowercase and replace all non-alphanumeric characters with hyphens
        const urlFriendlyName = doctor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        navigate(`/Appointment/${urlFriendlyName}`, { 
            state: { 
                selectedDoctor: doctor.name,
                doctorId: doctor._id
            } 
        });
        window.scrollTo(0, 0);
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.specialty-dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <section className="container-fluid" id="alldoctor-section">
            <div className="container">
                <div className="doctors-header">
                    <div className="header-icon">
                        <FontAwesomeIcon icon={faStethoscope} />
                    </div>
                    <h1>Our Medical Specialists</h1>
                    <p>Find the right specialist for your health needs with our expert medical professionals</p>
                    
                    <div className="search-and-filter-container">
                        <div className="search-box">
                            <input 
                                type="text" 
                                placeholder="Search doctors by name or specialty..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="specialty-dropdown-container">
                            <button 
                                className="specialty-dropdown-button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{activeSpecialty || 'All Specialties'}</span>
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}
                                />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="specialty-dropdown">
                                    <div className="specialty-dropdown-inner">
                                        <div 
                                            className={`specialty-dropdown-item ${!activeSpecialty ? 'active' : ''}`}
                                            onClick={() => handleSpecialtyChange('')}
                                        >
                                            <FontAwesomeIcon icon={faUserCheck} className="all-specialties-icon" />
                                            <span>All Specialties</span>
                                        </div>
                                        {specialityData.map((specialty, index) => (
                                            <div 
                                                key={index}
                                                className={`specialty-dropdown-item ${activeSpecialty === specialty.speciality ? 'active' : ''}`}
                                                onClick={() => handleSpecialtyChange(specialty.speciality)}
                                            >
                                                <img src={specialty.image} alt={specialty.speciality} className="specialty-icon" />
                                                <span>{specialty.speciality}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="doctors-container">
                    {filterDoc.length > 0 ? (
                        <>
                            <div className="results-count">
                                <span>
                                    {filterDoc.length} {filterDoc.length === 1 ? 'Doctor' : 'Doctors'} Found
                                    {activeSpecialty && ` in ${activeSpecialty}`}
                                </span>
                            </div>
                            <div className="row doctors-grid g-4">
                                {filterDoc.map((doctor) => {
                                    const availability = getAvailabilitySummary(doctor);
                                    return (
                                        <div key={doctor._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                            <div className="doctor-card" onClick={() => navigateToProfile(doctor._id)}>
                                                <div className="doctor-image">
                                                    <img src={doctor.image} alt={doctor.name} className="img-fluid" />
                                                    <div className={`next-available-badge ${availability.type}`}>
                                                        <FontAwesomeIcon icon={faCalendarCheck} />
                                                        <span>{availability.text}</span>
                                                    </div>
                                                    <div className="card-overlay">
                                                        <div className="overlay-content">
                                                            <FontAwesomeIcon icon={faUserMd} />
                                                            <span>View Profile</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="doctor-details">
                                                    <h3 className="doctor-name text-center">{doctor.name}</h3>
                                                    <p className="doctor-specialty text-center">
                                                        <strong>{doctor.speciality}</strong>
                                                    </p>
                                                    
                                                    <div className="doctor-info-row">
                                                        <div className="info-item doctor-experience">
                                                            <FontAwesomeIcon icon={faUserMd} />
                                                            <span>{doctor.experience}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="doctor-actions">
                                                        <button 
                                                            className="book-appointment-btn" 
                                                            onClick={(e) => handleBookAppointment(e, doctor)}
                                                            title="Book Appointment"
                                                        >
                                                            <FontAwesomeIcon icon={faCalendarPlus} />
                                                            <span>Book Appointment</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">
                                <FontAwesomeIcon icon={faStethoscope} />
                            </div>
                            <h3>No doctors found</h3>
                            <p>Try adjusting your search criteria or browse all specialties</p>
                            <button 
                                className="reset-filters-btn"
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveSpecialty('');
                                    navigate('/doctors');
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AllDoctors;