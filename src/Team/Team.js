import React from 'react';
import './Team.css';

const Team = () => {
    // Team members data - easy to add/modify
    const teamMembers = [
        {
            id: 1,
            name: "Dr. Kamal Subedi",
            position: "Chief Medical Officer",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 2,
            name: "Dr. Nidina Koirala",
            position: "Pediatric Specialist",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 3,
            name: "Dr. Rajesh Kumar",
            position: "Endocrinologist",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 4,
            name: "Dr. Nidina Koirala",
            position: "Gastroenterologist",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 5,
            name: "Dr. Kamal Subedi",
            position: "Cardiologist",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        },
        {
            id: 6,
            name: "Dr. Nidina Koirala",
            position: "General Physician",
            image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
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
                            <div className="team-card-inner">
                                <div className="member-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <p className="member-position">{member.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;