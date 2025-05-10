import React, { useEffect, useState } from 'react';
import './Herosection.css';

// Import default image for fallback
import defaultHeroImg from '../assets/images/home/header_img.png';
import defaultProfileImg from '../assets/images/about-us/our-svc.jpg';

// Import icons
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";

// Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function Herosection({ 
    carouselImages, 
    profileImage = defaultProfileImg,
    features = ['Same-day appointments', 'Verified specialists', 'Online consultations'],
    stats = [
        { number: '50+', label: 'Specialists' },
        { number: '10k+', label: 'Patients' }
    ],
    title = "Your Health, Our Priority",
    description = "Book appointments with expert doctors and specialists for personalized care. Take control of your health journey with our trusted medical professionals.",
    badgeText = "Healthcare Made Simple"
}) {
    // Animation states
    const [isVisible, setIsVisible] = useState(false);
    
    // Use provided images or fallback to default
    const slideImages = carouselImages && carouselImages.length > 0 
        ? carouselImages 
        : [{ src: defaultHeroImg, alt: "Doctor consulting with patient" }];
    
    // Scroll to top when navigating to appointment page
    const handleAppointmentClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Extract title parts for highlighting
    const renderTitle = () => {
        if (typeof title === 'string' && title.includes('<highlight>')) {
            const parts = title.split(/<highlight>|<\/highlight>/);
            return (
                <>
                    {parts[0]}
                    <span className="highlight">{parts[1]}</span>
                    {parts[2] || ''}
                </>
            );
        }
        
        // Default title with last word highlighted if no highlight tags
        if (typeof title === 'string') {
            const words = title.split(' ');
            const lastWord = words.pop();
            return (
                <>
                    {words.join(' ')} <span className="highlight">{lastWord}</span>
                </>
            );
        }
        
        return title;
    };
    
    // Trigger animations on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="hero-section" id='Home'>
            {/* Background elements with subtle animation */}
            <div className="background-elements">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
                <div className="subtle-dots"></div>
            </div>
            
            <div className="container">
                <div className="hero-layout">
                    {/* Left Side: Content with fade-in effect */}
                    <div className={`hero-text ${isVisible ? 'fade-in' : ''}`}>
                        <div className="hero-badge">
                            <div className="badge-dot"></div>
                            <span>{badgeText}</span>
                        </div>
                        
                        <h1 className='hero-title'>
                            {renderTitle()}
                        </h1>
                        
                        <p className="hero-description">
                            {description}
                        </p>
                        
                        <div className="hero-features">
                            {features.map((feature, index) => (
                                <div 
                                    className="feature-item" 
                                    key={index}
                                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                                >
                                    <IoIosCheckmarkCircle className="check-icon" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className='trust-indicators'>
                            <div className='profile-group'>
                                <img src={profileImage} alt='Trusted doctors' />
                            </div>
                            <div className='trust-stats'>
                                {stats.map((stat, index) => (
                                    <div className="stat" key={index}>
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="hero-cta">
                            <a href='/Appointment' className='appointment-button' onClick={handleAppointmentClick}>
                                Book Appointment 
                                <FaArrowRightLong className="arrow-icon" />
                            </a>
                            <a href='/AllDoctors' className='doctors-button' onClick={handleAppointmentClick}>
                                View Doctors
                            </a>
                        </div>
                    </div>
                    
                    {/* Right Side: Swiper Carousel with outside navigation arrows */}
                    <div className={`hero-carousel ${isVisible ? 'fade-in' : ''}`}>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            loop={true}
                            autoplay={{
                                delay: 2500, // slightly longer for better viewing
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[EffectCoverflow, Navigation, Autoplay]}
                            className="mySwiper"
                        >
                            {slideImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="slide-inner">
                                        <div className="slide-content">
                                            <img 
                                                src={image.src} 
                                                alt={image.alt || "Medical service"}
                                                className="slide-image" 
                                                loading="eager" // Prioritize loading these images
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        
                        {/* Sleeker arrow navigation positioned outside the carousel */}
                        <div className="custom-navigation">
                            <button className="nav-button swiper-button-prev" aria-label="Previous slide"></button>
                            <button className="nav-button swiper-button-next" aria-label="Next slide"></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Herosection;