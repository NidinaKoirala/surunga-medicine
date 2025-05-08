import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Herosection.css';

// Import default image for fallback
import defaultHeroImg from '../assets/images/home/header_img.png';
import grpimg from '../assets/images/about-us/our-svc.jpg';

// icons
import { FaArrowRightLong, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";

function Herosection({ carouselImages }) {
    // State for image carousel
    const [activeIndex, setActiveIndex] = useState(0);
    const autoPlayRef = useRef(null);
    
    // Use provided images or fallback to a default
    const images = carouselImages && carouselImages.length > 0 
        ? carouselImages 
        : [{ src: defaultHeroImg, alt: "Doctor consulting with patient" }];
    
    // Handle navigation
    const goToNext = useCallback(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);
    
    const goToPrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    const goToIndex = (index) => {
        setActiveIndex(index);
    };
    
    // Auto shuffle images
    useEffect(() => {
        // Only set up auto-shuffling if there's more than one image
        if (images.length <= 1) return;
        
        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                goToNext();
            }, 3000); // Change image every 3 seconds
        };
        
        startAutoPlay();
        
        // Cleanup function to clear interval when component unmounts
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [images.length, goToNext]); // Added goToNext to dependency array
    
    // Pause auto-shuffle on hover
    const pauseAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };
    
    // Resume auto-shuffle after hover
    const resumeAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        
        autoPlayRef.current = setInterval(() => {
            goToNext();
        }, 3000);
    };
    
    // Scroll to top when navigating to appointment page
    const handleAppointmentClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <section className="hero-section" id='Home'>
            <div className="container">
                <div className='hero-content'>
                    <div className='hero-text'>
                        <div className="hero-badge">
                            <span>Healthcare Made Simple</span>
                        </div>
                        
                        <h1 className='hero-title'>
                            Your Health, Our <span className="highlight">Priority</span>
                        </h1>
                        
                        <p className="hero-description">
                            Book appointments with expert doctors and specialists for personalized care. Take control of your health journey with our trusted medical professionals.
                        </p>
                        
                        <div className="hero-features">
                            <div className="feature-item">
                                <IoIosCheckmarkCircle className="check-icon" />
                                <span>Same-day appointments</span>
                            </div>
                            <div className="feature-item">
                                <IoIosCheckmarkCircle className="check-icon" />
                                <span>Verified specialists</span>
                            </div>
                            <div className="feature-item">
                                <IoIosCheckmarkCircle className="check-icon" />
                                <span>Online consultations</span>
                            </div>
                        </div>
                        
                        <div className='trust-indicators'>
                            <div className='profile-group'>
                                <img src={grpimg} alt='Trusted doctors' />
                            </div>
                            <div className='trust-stats'>
                                <div className="stat">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Specialists</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">10k+</span>
                                    <span className="stat-label">Patients</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hero-cta">
                            <a href='/Appointment' className='appointment-button' onClick={handleAppointmentClick}>
                                Book an appointment <FaArrowRightLong className="arrow-icon" />
                            </a>
                            <a href='/AllDoctors' className='doctors-button' onClick={handleAppointmentClick}>
                                View All Doctors
                            </a>
                        </div>
                    </div>
                    
                    <div className='hero-image-container'>
                        {/* BASIC AUTO-SHUFFLING CAROUSEL */}
                        <div 
                            className="basic-carousel"
                            onMouseEnter={pauseAutoPlay}
                            onMouseLeave={resumeAutoPlay}
                        >
                            {/* Display the active image with fade transition */}
                            <div className="basic-carousel-image">
                                <img 
                                    src={images[activeIndex].src} 
                                    alt={images[activeIndex].alt} 
                                    className="fade-in"
                                />
                            </div>
                            
                            {/* Navigation arrows */}
                            <button 
                                className="basic-carousel-arrow basic-carousel-arrow-left"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrev();
                                }}
                            >
                                <FaChevronLeft />
                            </button>
                            
                            <button 
                                className="basic-carousel-arrow basic-carousel-arrow-right"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                            >
                                <FaChevronRight />
                            </button>
                            
                            {/* Indicator dots */}
                            {images.length > 1 && (
                                <div className="basic-carousel-indicators">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`basic-carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                goToIndex(index);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="feature-cards-container">
                            <div className="feature-card">
                                <div className="feature-icon">⏰</div>
                                <div className="feature-content">
                                    <span className="feature-title">Quick Appointments</span>
                                    <span className="feature-subtitle">Book in minutes</span>
                                </div>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">👨‍⚕️</div>
                                <div className="feature-content">
                                    <span className="feature-title">Expert Doctors</span>
                                    <span className="feature-subtitle">Verified specialists</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Herosection;