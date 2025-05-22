import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TopDoctors.css"
import { AppContext } from "../Context/AppContext";
import { FaStar, FaStarHalfAlt, FaUserMd, FaArrowRight } from "react-icons/fa";

function TopDoctors() {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    
    // Function to render rating stars
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="star" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star" />);
        }
        
        return stars;
    };
    
    // Navigate to doctor profile
    const handleDoctorClick = (doctorId) => {
        window.scrollTo(0, 0);
        navigate(`/doctor/${doctorId}`);
    };
    
    // Handle view all doctors click with scroll to top
    const handleViewAllClick = () => {
        window.scrollTo(0, 0);
    };
    
    // Get top 4 doctors (you could add some criteria here to select actual top doctors)
    const topDoctors = doctors.slice(0, 4);
    
    return (
        <section className="top-doctors-section" id="top-doctors">
            <div className="container">
                <div className="top-doctors-header">
                    <h1>Top Doctors to Book</h1>
                    <p>Connect with our highly qualified and experienced doctors for personalized care tailored to your needs</p>
                </div>
                
                <div className="top-doctors-grid">
                    {topDoctors.map((doctor, index) => (
                        <div 
                            key={index} 
                            className="doctor-card"
                            onClick={() => handleDoctorClick(doctor._id)}
                        >
                            <div className="doctor-image">
                                <img src={doctor.image} alt={doctor.name} />
                                <div className="doctor-badge">Available</div>
                            </div>
                            
                            <div className="doctor-details">
                                <h3 className="doctor-name text-center">{doctor.name}</h3>
                                <p className="doctor-speciality text-center"><strong>{doctor.speciality}</strong></p>
                                
                                <div className="doctor-meta">
                                    <div className="doctor-rating text-center">
                                        {renderRating(4.5)}
                                        <span className="rating-count">(120+)</span>
                                    </div>
                                    
                                    <div className="doctor-info">
                                        <div className="info-item experience-item">
                                            <FaUserMd className="info-icon" />
                                            <span>{doctor.experience}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="view-profile-btn">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="view-all-container">
                    <Link to="/AllDoctors" className="view-all-btn" onClick={handleViewAllClick}>
                        View All Doctors <FaArrowRight className="arrow-icon" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default TopDoctors;