import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AllDoctors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUserMd, faSearch, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
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
    
    // Use context to get doctors and specialityData
    const { doctors, specialityData } = useContext(AppContext);
    
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
    };
    
    // Function to navigate to doctor profile
    const navigateToProfile = (doctorId) => {
        navigate(`/doctor/${doctorId}`);
    };
    
    // Function to handle booking appointment
    const handleBookAppointment = (e, doctor) => {
        e.stopPropagation(); // Prevent card click event from triggering
        navigate('/appointment', { 
            state: { 
                selectedDoctor: doctor.name,
                doctorId: doctor._id
            } 
        });
        window.scrollTo(0, 0);
    };
    
    // Function to render rating stars
    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 4.5);
        const hasHalfStar = (rating || 4.5) % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star-icon" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="star-icon" />);
        }
        
        return stars;
    };
    
    return (
        <section className="container-fluid" id="alldoctor-section">
            <div className="container">
                <div className="doctors-header">
                    <h1>Our Medical Specialists</h1>
                    <p>Find the right specialist for your health needs</p>
                    
                    <div className="search-container">
                        <div className="search-box">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search doctors by name or specialty" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12 col-md-3 col-lg-2">
                        <div className="specialties-container">
                            <h3>Specialties</h3>
                            <div className="specialties-list">
                                {specialityData.map((specialty, index) => (
                                    <div 
                                        key={index}
                                        className={`specialty-item ${activeSpecialty === specialty.speciality ? 'active' : ''}`}
                                        onClick={() => handleSpecialtyChange(specialty.speciality)}
                                    >
                                        <img src={specialty.image} alt={specialty.speciality} className="specialty-icon" />
                                        <span>{specialty.speciality}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-9 col-lg-10">
                        <div className="doctors-container">
                            {filterDoc.length > 0 ? (
                                <div className="row doctors-grid">
                                    {filterDoc.map((doctor) => (
                                        <div key={doctor._id} className="col-12 col-md-6 col-lg-4">
                                            <div className="doctor-card" onClick={() => navigateToProfile(doctor._id)}>
                                                <div className="doctor-image">
                                                    <img src={doctor.image} alt={doctor.name} className="img-fluid" />
                                                    <div className="available-badge">Available</div>
                                                </div>
                                                
                                                <div className="doctor-details">
                                                    <h3 className="doctor-name text-center">{doctor.name}</h3>
                                                    <p className="doctor-specialty text-center"><strong>{doctor.speciality}</strong></p>
                                                    
                                                    <div className="doctor-rating text-center">
                                                        {renderRatingStars(4.8)}
                                                        <span className="rating-number">4.8</span>
                                                    </div>
                                                    
                                                    <div className="doctor-info-row">
                                                        <div className="info-item doctor-experience">
                                                            <FontAwesomeIcon icon={faUserMd} />
                                                            <span>{doctor.experience}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="doctor-actions">
                                                        <button className="view-profile-btn">
                                                            View Profile
                                                        </button>
                                                        <button 
                                                            className="book-appointment-btn" 
                                                            onClick={(e) => handleBookAppointment(e, doctor)}
                                                            title="Book Appointment"
                                                        >
                                                            <FontAwesomeIcon icon={faCalendarPlus} />
                                                            <span>Book</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <h3>No doctors found</h3>
                                    <p>Try adjusting your search or filter criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AllDoctors;