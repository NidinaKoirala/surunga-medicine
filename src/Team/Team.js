import React from 'react';
import './Team.css';

import kamalImage from '../assets/images/team/kamal-subedi.jpeg';

const Team = () => {
    // Team members data - easy to add/modify
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Kamal Subedi",
            position: "Chief Medical Officer",
            image: kamalImage, 
        },
        {
            id: 2,
            name: "Dr. Nidina Koirala",
            position: "Pediatric Specialist",
            image: kamalImage,
        },
        {
            id: 3,
            name: "Dr. Rajesh Kumar",
            position: "Endocrinologist",
            image: kamalImage,
        },
        {
            id: 4,
            name: "Dr. Nidina Koirala",
            position: "Gastroenterologist",
            image: kamalImage,
        },
        {
            id: 5,
            name: "Dr. Kamal Subedi",
            position: "Cardiologist",
            image: kamalImage,
        },
        {
            id: 6,
            name: "Dr. Nidina Koirala",
            position: "General Physician",
            image: kamalImage,
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