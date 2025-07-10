import React from 'react';
import './Team.css';

import alishaImage from '../assets/images/team/alisha-limbu.jpg';
import dikshyaImage from '../assets/images/team/dikshya-poudel.jpg';
import nishaImage from '../assets/images/team/nisha-karki.jpg';
import rekhaImage from '../assets/images/team/rekha-poudel.jpg';
import sushmaImage from '../assets/images/team/sushma-karki.jpg';

const Team = () => {
    // Team members data - easy to add/modify
    const teamMembers = [
        {
            id: 1,
            name: "Alisha Hembya Limbu",
            position: "Lab Assistant",
            image: alishaImage, 
        },
        {
            id: 2,
            name: "Dikshya Poudel",
            position: "Lab Assistant",
            image: dikshyaImage,
        },
        {
            id: 3,
            name: "Nisha Karki",
            position: "Lab Assistant",
            image: nishaImage,
        },
        {
            id: 4,
            name: "Rekha Poudel",
            position: "Lab Assistant",
            image: rekhaImage,
        },
        {
            id: 5,
            name: "Sushma Karki",
            position: "Lab Assistant",
            image: sushmaImage,
        }
    ];

    return (
        <section className="team-section">
            <div className="container">
                <div className="team-header">
                    <h2>Meet Our Expert Team</h2>
                    <p>Our highly qualified medical professionals are dedicated to providing exceptional care</p>
                </div>
                
                <div className="team-grid">
                    {teamMembers.map((member) => (
                        <div className="team-card" key={member.id}>
                            <div className="member-image-container">
                                {/* Main image */}
                                <div className="member-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                
                                {/* Inner gradient circle that appears on hover */}
                                <div className="outer-circle"></div>
                            </div>
                            
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-position">{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;