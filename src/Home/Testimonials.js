import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "सुनिता तामाङ",
            position: "मुटु रोग विशेषज्ञ सेवाग्राही",
            image: "https://randomuser.me/api/portraits/women/32.jpg",
            review: "सुरुङ्गा मेडिसिन एण्ड क्लिनिकले मेरो स्वास्थ्य सेवा अनुभवलाई पूर्णरूपमा परिवर्तन गरेको छ। यो प्लेटफर्म अत्यन्तै प्रयोगकर्ता-मैत्री छ, र मैले केही मिनेटमै विशेषज्ञसँग भेटघाट बुक गर्न सकें। डाक्टर उत्कृष्ट थिए र मेरा सबै चिन्ताहरूलाई सम्बोधन गर्न पर्याप्त समय दिए।",
            rating: 5
        },
        {
            id: 2,
            name: "रामेश श्रेष्ठ",
            position: "मिर्गौला उपचार सेवाग्राही",
            image: "https://randomuser.me/api/portraits/men/15.jpg",
            review: "मैले विगत ६ महिनादेखि मेरो नियमित जाँचका लागि सुरुङ्गा मेडिसिन एण्ड क्लिनिक प्रयोग गर्दै आएको छु। अपोइन्टमेन्ट बुक गर्ने र मेरो मेडिकल रेकर्डहरू एकै ठाउँमा पहुँच गर्ने सुविधाले मेरो स्वास्थ्य व्यवस्थापन गर्न धेरै सजिलो बनाएको छ। अत्यन्तै सिफारिस गर्दछु!",
            rating: 5
        },
        {
            id: 3,
            name: "प्रिया गुरुङ",
            position: "महिला स्वास्थ्य सेवाग्राही",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            review: "तीन बच्चाकी व्यस्त आमाको रूपमा, मेरा बच्चाहरूलाई डाक्टरको अपोइन्टमेन्टमा लिएर जान समय निकाल्न सधैं चुनौतीपूर्ण थियो। सुरुङ्गा मेडिसिन एण्ड क्लिनिकको माध्यमबाट, म हाम्रो तालिकालाई अवरोध नगरी मेरा बच्चाहरूका लागि भर्चुअल परामर्श बुक गर्न सक्छु। बाल रोग विशेषज्ञहरू अद्भुत छन्!",
            rating: 4
        },
        {
            id: 4,
            name: "विनोद खड्का",
            position: "जनरल स्वास्थ्य परामर्श सेवाग्राही",
            image: "https://randomuser.me/api/portraits/men/47.jpg",
            review: "सुरुङ्गा मेडिसिन एण्ड क्लिनिकमा डाक्टरहरूको गुणस्तर असाधारण छ। मलाई एउटा जटिल समस्या थियो जसलाई अघिल्ला डाक्टरहरूले ठीकसँग निदान गर्न सकेनन्। यस प्लेटफर्म मार्फत, मैले एक विशेषज्ञ भेट्टाएँ जसले मेरो अवस्था पहिचान गरे र प्रभावकारी उपचार योजना विकास गरे।",
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
                                    <img src={testimonial.image} alt={testimonial.name} className="author-image" />
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