import { useNavigate } from 'react-router-dom';
import './Banner.css';
import Bannerimg from "../assets/images/appointment_img.png";

function Banner() {
    const navigate = useNavigate();

    // Function to handle appointment button click
    const handleAppointmentClick = () => {
        // Scroll to top before navigating
        window.scrollTo(0, 0);
        
        navigate('/Appointment');
    };

    return (
        <section className="banner-section" id="banner">
            <div className="container" id="banner-container">
                <div className="banner-content">
                    {/* Background image */}
                    <div className="banner-background">
                        <img src={Bannerimg} alt="Doctor appointment" className="background-img" />
                    </div>
                    
                    {/* Overlay for better text readability */}
                    <div className="banner-overlay"></div>
                    
                    {/* Text content over the image */}
                    <div className="banner-text">
                        <h2 className="banner-title">
                            Book Appointment With 100+ Trusted Doctors
                        </h2>
                        <button 
                            className="appointment-btn"
                            onClick={handleAppointmentClick}
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;