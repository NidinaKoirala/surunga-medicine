import React from 'react';

// Import hero images directly in Home component
import heroimg from '../assets/images/home/front-3.jpg';
import doctorImage1 from '../assets/images/home/front-1.jpg';
import doctorImage2 from '../assets/images/home/front-2.jpg';
import doctorImage3 from '../assets/images/about-us/children-doctor.jpg';

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
        { src: heroimg, alt: "Doctor consulting with patient" },
        { src: doctorImage1, alt: "Medical professional with equipment" },
        { src: doctorImage2, alt: "Doctor examining x-ray results" },
        { src: doctorImage3, alt: "Healthcare team discussion" }
    ];
    
    // Additional hero section customization (optional)
    const heroFeatures = [
        'Same-day appointments', 
        'Verified specialists', 
        'Online consultations'
    ];
    
    const heroStats = [
        { number: '50+', label: 'Specialists' },
        { number: '10k+', label: 'Patients' }
    ];
    
    const heroTitle = "Your Health, Our <highlight>Priority</highlight>";
    
    return (
        <React.Fragment>
            <Herosection 
                carouselImages={carouselImages}
                profileImage={doctorImage2} 
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