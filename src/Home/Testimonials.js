import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Option 1: Import the image directly (recommended for assets folder)
import narayaniImage from '../assets/images/testomonials/narayani-oli.jpeg';
import junupuriImage from '../assets/images/testomonials/junupuri.jpeg';
function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Narayani Oli",
            position: "स्वास्थ्य परीक्षण, औषधि उपचार सेवाग्राही",
            image: narayaniImage,
            review: "म नारायणी ओली, झापा जिल्लाको कन्काई–३ निवासी ८२ वर्षीय नागरिक हुँ। जीवनको यो उत्तरार्धमा पनि स्वस्थ्य जीवन जिउन पाउनु, मेरो लागि वरदानजस्तै हो। यस वरदानमा ठूलो हात रहेको छ — हाम्रो नजिकै रहेको सुरुङ्गा मेडिसिन सेन्टरको। यस केन्द्रमा मैले गरेको स्वास्थ्य परीक्षण, औषधि उपचार, र समय–समयमा पाइरहेको चिकित्सकीय सल्लाह–सुझावले मलाई शारीरिक मात्र होइन, मानसिक सान्त्वना पनि दिएको छ। यहाँ कार्यरत डाक्टरहरू अत्यन्तै अनुभवि, दक्ष र मानवतावादी सोच बोकेका हुनुहुन्छ। सधैं मुस्कानका साथ सेवामा समर्पित कर्मचारीहरू पनि प्रशंसायोग्य छन्। उमेरका हिसाबले सानातिना स्वास्थ्य समस्याहरू आइरहन्छन्, तर यस्ता समस्याहरूलाई सहजै समाधान गरिदिनु भएको छ – सुरुङ्गा मेडिसिन सेन्टरका चिकित्सकहरूको लगनशीलता र सेवाभावले। आज म स्वास्थ्य छु दिनप्रतिदिनको जीवनमा आशा बोकेर अघि बढिरहेको छु। यसको श्रेय एक हदसम्म यस संस्थालाई दिन्छु। सुरुङ्गा मेडिसिन परिवारप्रति म सधैं कृतज्ञ छु।",
            rating: 5
        },
        {
            id: 2,
            name: "Junu Puri",
            position: "Skin Patient",
            image: junupuriImage,
            review: "म यस क्लिनिकमा धेरै वर्षदेखि नियमित रूपमा Dermatologist लाई भेट्छु र मेरो अनुभव अत्यन्तै सकारात्मक छ। यहाँका डाक्टर र करमचारी सबै अत्यन्तै राम्रो, दयालु र व्यवसायिक छन्। तिनीहरूले बिरामीहरूलाई धैर्यसाथ सुन्छन् र उचित सल्लाह दिन्छन्। सबैभन्दा राम्रो कुरा यो हो कि यहाँ सबै प्रकारका छालासम्बन्धी उपचार र औषधि उपलब्ध छन्। मलाई अन्य ठाउँमा धेरै कुदनु पर्दैन, सबै सेवा एकै ठाउँमा पाउन सकिन्छ। अपोइन्टमेन्ट बुक गर्न सजिलो छ र प्रतीक्षा समय पनि कम छ। समग्रमा, यो क्लिनिकले मेरो छालाको स्वास्थ्य राम्रो राख्न मद्दत गरेको छ।",
            rating: 5
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    
    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [testimonials.length]);
    
    // Manual navigation
    const goToTestimonial = (index) => {
        setActiveIndex(index);
    };

    // Render stars based on rating
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <FaStar key={index} className={index < rating ? 'star-filled' : 'star-empty'} />
        ));
    };

    // Handle image loading errors
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/80x80/cccccc/666666?text=No+Image';
    };

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <div className="testimonials-header text-center">
                    <h2>What Our Patients Say</h2>
                    <p className="testimonials-subtitle">Hear from the people who have experienced our services firsthand</p>
                </div>
                
                <div className="testimonials-carousel">
                    <div className="testimonials-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="quote-icon">
                                    <FaQuoteLeft />
                                </div>
                                <div className="testimonial-rating">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="testimonial-text">
                                    {testimonial.review}
                                </p>
                                <div className="testimonial-author">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="author-image"
                                        onError={handleImageError}
                                    />
                                    <div className="author-info">
                                        <h4 className="author-name">{testimonial.name}</h4>
                                        <p className="author-position">{testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="carousel-indicators">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => goToTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;