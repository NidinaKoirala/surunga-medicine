import React from 'react';
import './Herosection.css';

import Herosection from './Herosection';
import SpecialityMenu from './SpecialityMenu';
import UpcomingDoctors from './UpcomingDoctors';
import Services from './Services';
import TopDoctors from './TopDoctors';
import AboutUs from './AboutUs';
import Banner from './Banner';
import Testimonials from './Testimonials';

function Home() {
    return (
        <React.Fragment>
            <Herosection />
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