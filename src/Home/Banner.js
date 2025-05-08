import { useNavigate } from 'react-router-dom';
import './Banner.css';
import Bannerimg from "../assets/images/appointment_img.png";

function Banner() {
    const navigate = useNavigate();

    // Function to handle appointment button click
    const handleAppointmentClick = () => {
        navigate('/Appointment');
    };

    return (
        <section className="banner-section" id="banner">
            <div className="container" id="banner-container">
                <div className="banner-content">
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
                    <div className="banner-image">
                        <img src={Bannerimg} alt="Doctor appointment" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;