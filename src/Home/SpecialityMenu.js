import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpecialMenu.css';
import { AppContext } from '../Context/AppContext';

function SpecialityMenu() {
    const { specialityData, doctors } = useContext(AppContext);
    const navigate = useNavigate();
    
    // Function to handle specialty click
    const handleSpecialtyClick = (specialty) => {
        // Scroll to top before navigating
        window.scrollTo(0, 0);
        
        navigate(`/doctors/${specialty}`);
    };
    
    // Helper function to count doctors by specialty
    const countDoctorsBySpeciality = (speciality) => {
        return doctors.filter(doctor => doctor.speciality === speciality).length;
    };
    
    return (
        <section className="speciality-section" id="menu-special">
            <div className="container">
                <div className="speciality-header">
                    <h2>Find by Speciality</h2>
                    <p>Browse through our extensive list of trusted doctors and schedule your appointment hassle-free.</p>
                </div>
                
                <div className="speciality-grid">
                    {specialityData.map((specialty, index) => (
                        <div 
                            key={index}
                            className="speciality-card"
                            onClick={() => handleSpecialtyClick(specialty.speciality)}
                        >
                            <div className="speciality-icon">
                                <img src={specialty.image} alt={specialty.speciality} />
                            </div>
                            <h3>{specialty.speciality}</h3>
                            <span className="speciality-count">
                                {countDoctorsBySpeciality(specialty.speciality)}+ Doctors
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SpecialityMenu;