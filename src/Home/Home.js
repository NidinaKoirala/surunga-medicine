import React from 'react';
import './Herosection.css';

// Import hero images directly in Home component
import heroimg from '../assets/images/home/header_img.png';
import doctorImage1 from '../assets/images/about-us/more-svc.jpg';
import doctorImage2 from '../assets/images/about-us/our-svc.jpg';
import doctorImage3 from '../assets/images/about-us/children-doctor.jpg';

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

    return (
        <React.Fragment>
            <Herosection carouselImages={carouselImages} />
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