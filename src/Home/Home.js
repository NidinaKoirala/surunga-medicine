import React from 'react';

// Import hero images directly in Home component
import front3 from '../assets/images/home/front-3.jpg';
import front1 from '../assets/images/home/front-1.jpg';
import front2 from '../assets/images/home/front-2.jpg';
import front4 from '../assets/images/home/front-4.jpg';
import front5 from '../assets/images/home/front-5.jpg';
import profileImage from '../assets/images/logo-hospital.png';

// Import components
import Herosection from './Herosection';
import SpecialityMenu from './SpecialityMenu';
import UpcomingDoctors from './UpcomingDoctors';
import Services from './Services';
import LabTests from './LabTests';
import TopDoctors from './TopDoctors';
import AboutUs from './AboutUs';
import Banner from './Banner';
import Testimonials from './Testimonials';

function Home() {
    // Define carousel images directly in the component
    const carouselImages = [
        { src: front3, alt: "Barista Kidney Rog Bisesagya" },
        { src: front1, alt: "Basrita Hydrocil Bisesagya" },
        { src: front2, alt: "Basrita Stri Rog Bisesagya" },
        { src: front5, alt: "Basrista Sisu Bisesagya" },
        { src: front4, alt: "Barsta Mutu Rog Bisesagya" }
    ];
    
    // Additional hero section customization (optional)
    const heroFeatures = [
        'Same-day appointments', 
        'Verified specialists', 
        'Online consultations'
    ];
    
    const heroStats = [
        { number: '20+', label: 'Specialists' },
        { number: '100k+', label: 'Patients' }
    ];
    
    const heroTitle = "Your Health, Our <highlight>Priority</highlight>";
    
    return (
        <React.Fragment>
            <Herosection 
                carouselImages={carouselImages}
                profileImage={profileImage} 
                features={heroFeatures}
                stats={heroStats}
                title={heroTitle}
                description="Book appointments with expert doctors and specialists for personalized care. Take control of your health journey with our trusted medical professionals."
                badgeText="Healthcare Made Simple"
            />
            <SpecialityMenu />
            <UpcomingDoctors />
            <Services />
            <LabTests />
            <TopDoctors />
            <AboutUs />
            <Banner />
            <Testimonials />
        </React.Fragment>
    );
}

export default Home;