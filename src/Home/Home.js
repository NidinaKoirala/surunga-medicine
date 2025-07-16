import React from 'react';

// Import hero images directly in Home component
import front3 from '../assets/images/home/front-3.jpg';
import front1 from '../assets/images/home/front-1.jpg';
import front2 from '../assets/images/home/front-2.jpg';
import front4 from '../assets/images/home/front-4.jpg';
import front5 from '../assets/images/home/front-5.jpg';
import front6 from '../assets/images/home/front-6.jpg';
import front7 from '../assets/images/home/front-7.jpg';
import front8 from '../assets/images/home/front-8.jpg';
import front9 from '../assets/images/home/front-9.jpg';
import front10 from '../assets/images/home/front-10.jpg';
import front11 from '../assets/images/home/front-11.jpg';
import front12 from '../assets/images/home/front-12.jpg';
import front13 from '../assets/images/home/front-13.jpg';

import profileImage from '../assets/images/logo-hospital.png';

// Import components
import Herosection from './Herosection';
import SpecialityMenu from './SpecialityMenu';
import UpcomingDoctors from './UpcomingDoctors';
import Services from './Services';
import TopDoctors from './TopDoctors';
import AboutUs from './AboutUs';
import Banner from './Banner';
import Testimonials from './Testimonials';

function Home() {
    // Define carousel images directly in the component
    const carouselImages = [
        { src: front3},
        { src: front6},        
        { src: front1},
        { src: front7},        
        { src: front2},
        { src: front8},  
        { src: front4},              
        { src: front10},
        { src: front5},        
        { src: front11},
        { src: front12},              
        { src: front9 },
        { src: front13}      
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
            <TopDoctors />
            <AboutUs />
            <Banner />
            <Testimonials />
        </React.Fragment>
    );
}

export default Home;