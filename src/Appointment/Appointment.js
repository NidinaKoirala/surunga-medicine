import React, { useEffect } from 'react';
import './Appointment.css';

const Appointment = () => {
  // Load Calendly script when component mounts
  useEffect(() => {
    // Create and append Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Clean up function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Schedule Your Appointment</h1>
        <p>Select your preferred date and time for your medical consultation</p>
      </div>
      
      <div className="calendly-container">
        <div 
          className="calendly-inline-widget"
          data-url="https://medicinegbnj.setmore.com/book" 
          style={{ minWidth: '320px', height: '700px' }}
        ></div>
      </div>
    </div>
  );
};

export default Appointment;