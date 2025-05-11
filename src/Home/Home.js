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
        'सोही दिन अपोइन्टमेन्ट',
        'प्रमाणित विशेषज्ञ चिकित्सकहरू',
        'अनलाइन परामर्श'
    ];
    
    const heroStats = [
        { number: '50+', label: 'Specialists' },
        { number: '10k+', label: 'Patients' }
    ];
    
    const heroTitle = "तपाईंको स्वास्थ्य, हाम्रो <highlight>प्राथमिकता</highlight>";
    
    return (
        <React.Fragment>
            <Herosection 
                carouselImages={carouselImages}
                profileImage={doctorImage2} 
                features={heroFeatures}
                stats={heroStats}
                title={heroTitle}
                description="सुरुङ्गा मेडिसिन एण्ड क्लिनिकमा - उत्कृष्ट डाक्टरहरूसँग सहज अपोइन्टमेन्ट, तपाईंको स्वास्थ्य हाम्रो प्रतिबद्धता। स्वस्थ जीवनको यात्रा अब तपाईंको हातमा! आजै भेट्नुहोस् र आफ्नो स्वास्थ्यमा नयाँ अध्याय सुरु गर्नुहोस्।"
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