import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            position: "Patient",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            review: "MedConnect has completely transformed my healthcare experience. The platform is incredibly user-friendly, and I was able to book an appointment with a specialist in just a few minutes. The doctor was excellent and spent adequate time addressing all my concerns.",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            position: "Patient",
            image: "https://randomuser.me/api/portraits/men/15.jpg",
            review: "I've been using MedConnect for the past 6 months for my regular check-ups. The convenience of booking appointments and accessing my medical records in one place has made managing my health so much easier. Highly recommended!",
            rating: 5
        },
        {
            id: 3,
            name: "Amanda Rodriguez",
            position: "Parent",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            review: "As a busy mom of three, finding time to take my kids to doctor appointments was always challenging. With MedConnect, I can book virtual consultations for my children without disrupting our schedule. The pediatricians are amazing!",
            rating: 4
        },
        {
            id: 4,
            name: "David Wilson",
            position: "Patient",
            image: "https://randomuser.me/api/portraits/men/47.jpg",
            review: "The quality of doctors on MedConnect is exceptional. I had a chronic issue that previous doctors couldn't diagnose properly. Through this platform, I found a specialist who identified my condition and developed an effective treatment plan.",
            rating: 5
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    
    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [testimonials.length]);
    
    // Manual navigation
    const goToTestimonial = (index) => {
        setActiveIndex(index);
    };

    // Render stars based on rating
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <FaStar key={index} className={index < rating ? 'star-filled' : 'star-empty'} />
        ));
    };

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <div className="testimonials-header text-center">
                    <h2>What Our Patients Say</h2>
                    <p className="testimonials-subtitle">Hear from the people who have experienced our services firsthand</p>
                </div>
                
                <div className="testimonials-carousel">
                    <div className="testimonials-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="quote-icon">
                                    <FaQuoteLeft />
                                </div>
                                <div className="testimonial-rating">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="testimonial-text">
                                    {testimonial.review}
                                </p>
                                <div className="testimonial-author">
                                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.name}</h4>
                                        <p className="author-position">{testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="carousel-indicators">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => goToTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;