import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./TopDoctors.css"
import { AppContext } from "../Context/AppContext";
import { FaUserMd, FaArrowRight, FaClock, FaCalendarCheck } from "react-icons/fa";

function TopDoctors() {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    
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
    
    // Helper function to format availability for display
    const formatAvailability = (doctor) => {
        if (doctor.availability?.note) {
            // Parse the note to make it more concise for card display
            const note = doctor.availability.note;
            
            // Check for special patterns
            if (note.includes('everyday') || note.includes('Available everyday')) {
                const timeMatch = note.match(/at (\d+(?::\d+)? ?(?:AM|PM))/i);
                if (timeMatch) {
                    return `Daily • ${timeMatch[1]}`;
                }
                return 'Available Daily';
            }
            
            if (note.includes('every')) {
                // Extract day and time
                const dayMatch = note.match(/every (\w+)/i);
                const timeMatch = note.match(/at (\d+(?::\d+)? ?(?:AM|PM))/i);
                if (dayMatch && timeMatch) {
                    return `Every ${dayMatch[1]} • ${timeMatch[1]}`;
                }
            }
            
            // For monthly schedules
            if (note.includes('month')) {
                const weekMatch = note.match(/(\d+\w+|first|second|third|fourth|last) (\w+)/i);
                const timeMatch = note.match(/at (\d+(?::\d+)? ?(?:AM|PM))/i);
                if (weekMatch && timeMatch) {
                    return `${weekMatch[1]} ${weekMatch[2]} • ${timeMatch[1]}`;
                }
            }
            
            // For multiple days
            if (note.includes('Sunday') || note.includes('Monday') || note.includes('Tuesday') || 
                note.includes('Wednesday') || note.includes('Thursday') || note.includes('Friday') || 
                note.includes('Saturday')) {
                const dayMap = {
                    'Sunday': 'Sun', 'Monday': 'Mon', 'Tuesday': 'Tue', 
                    'Wednesday': 'Wed', 'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat'
                };
                let availableDays = [];
                Object.keys(dayMap).forEach(fullDay => {
                    if (note.includes(fullDay)) {
                        availableDays.push(dayMap[fullDay]);
                    }
                });
                if (availableDays.length > 0) {
                    const timeMatch = note.match(/at (\d+(?::\d+)? ?(?:AM|PM))/i) || 
                                     note.match(/(\d+(?::\d+)? ?(?:AM|PM))/i);
                    if (timeMatch) {
                        return `${availableDays.join(', ')} • ${timeMatch[1]}`;
                    }
                    return availableDays.join(', ');
                }
            }
            
            // Fallback - return a shortened version of the note
            return note.length > 30 ? note.substring(0, 30) + '...' : note;
        }
        
        return 'Schedule Available';
    };
    
    // Helper function to determine availability status
    const getAvailabilityStatus = (doctor) => {
        const today = new Date();
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDay = days[today.getDay()];
        const currentHour = today.getHours();
        
        // Check if doctor is available today
        if (doctor.availability?.days) {
            const todaySchedule = doctor.availability.days[currentDay];
            if (todaySchedule && todaySchedule.length > 0) {
                // Check if currently available
                for (let time of todaySchedule) {
                    const [hour] = time.split(':');
                    const scheduleHour = parseInt(hour);
                    if (Math.abs(scheduleHour - currentHour) <= 1) {
                        return { status: 'available-now', text: 'Available Now' };
                    }
                }
                return { status: 'available-today', text: 'Available Today' };
            }
        }
        
        return { status: 'available', text: 'Available' };
    };
    
    return (
        <section className="top-doctors-section" id="top-doctors">
            <div className="container">
                <div className="top-doctors-header">
                    <h1>Top Doctors to Book</h1>
                    <p>Connect with our highly qualified and experienced doctors for personalized care tailored to your needs</p>
                </div>
                
                <div className="top-doctors-grid">
                    {topDoctors.map((doctor, index) => {
                        const availability = getAvailabilityStatus(doctor);
                        const scheduleInfo = formatAvailability(doctor);
                        
                        return (
                            <div 
                                key={index} 
                                className="doctor-card"
                                onClick={() => handleDoctorClick(doctor._id)}
                            >
                                <div className="doctor-image">
                                    <img src={doctor.image} alt={doctor.name} />
                                    <div className={`doctor-badge ${availability.status}`}>
                                        {availability.text}
                                    </div>
                                </div>
                                
                                <div className="doctor-details">
                                    <h3 className="doctor-name text-center">{doctor.name}</h3>
                                    <p className="doctor-speciality text-center"><strong>{doctor.speciality}</strong></p>
                                    
                                    <div className="doctor-meta">
                                        <div className="doctor-info">
                                            <div className="info-item experience-item">
                                                <FaUserMd className="info-icon" />
                                                <span>{doctor.experience}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="availability-info">
                                            <div className="availability-schedule">
                                                <FaClock className="schedule-icon" />
                                                <span className="schedule-text">{scheduleInfo}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button className="view-profile-btn">
                                        <FaCalendarCheck className="btn-icon" />
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        );
                    })}
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