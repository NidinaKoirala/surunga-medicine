import React from 'react';
import './Herosection.css';

// import images
import heroimg from '../assets/images/home/header_img.png'
import grpimg from '../assets/images/home/group_profiles.png'

// icon
import { FaArrowRightLong } from "react-icons/fa6";

function Herosection() {
    return (
        <React.Fragment>
            <section className="container-fluid" id='Home'>
                {/* Decorative shapes */}
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
                
                <div className="container" id='home-container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 hero-title-div'>
                            <p className='hero-title'>
                                Book Appointment With Trusted Doctors
                            </p>
                            <div className='group-img'>
                                <img src={grpimg} alt='group img' />
                                <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free, and take control of your health journey.</p>
                            </div>
                            <a href='/AllDoctors' className='rounded-pill'>
                                Book appointment <span><FaArrowRightLong /></span>
                            </a>
                        </div>
                        <div className='col-12 col-md-6 hero-img'>
                            <img src={heroimg} alt='heroimage' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Herosection;