import { useContext } from "react";
import { Link } from "react-router-dom";
import "./TopDoctors.css"
import { AppContext } from "../Context/AppContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function TopDoctors() {
    const { doctors } = useContext(AppContext)
    
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
    
    return (
        <>
            <section className="container-fluid" id='top-doctors'>
                <div className='container'>
                    <div className="Doctors-title">
                        <h1>Top Doctors to Book</h1>
                        <p>Connect with our highly qualified and experienced doctors for personalized care tailored to your needs</p>
                    </div>
                    <div className="row" id="doctor-card-container">
                        {
                            doctors.slice(0, 4).map((item, index) => {
                                return (
                                    <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-3" id="doctor-card">
                                        <img src={item.image} alt={`Dr. ${item.name}`} className="img-fluid" />
                                        <div className="doctor-info">
                                            <div className="available">
                                                <p></p><p>Available</p>
                                            </div>
                                            <p className="doctor-name">Dr. {item.name}</p>
                                            <p className="doctor-speciality">{item.speciality}</p>
                                            <div className="doctor-rating">
                                                {renderRating(4.5)}
                                                <span className="rating-count">(120+)</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="more-btn">
                        <Link to="/AllDoctors" className="btn rounded-pill">
                            <button className="btn rounded-pill">View All Doctors</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TopDoctors;