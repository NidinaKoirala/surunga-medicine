import React from 'react';
import './Herosection.css';

import Herosection from './Herosection';
import SpecialityMenu from './SpecialityMenu';
import TopDoctors from './TopDoctors';
import Banner from './Banner';
import Services from './Services';
import AboutUs from './AboutUs';
import Testimonials from './Testimonials';
function Home() {
    return (
        <React.Fragment>
            <Herosection />
            <SpecialityMenu />
            <Services />
            <TopDoctors />
            <AboutUs />
            <Banner />
            <Testimonials />
        </React.Fragment>
    );
}

export default Home;