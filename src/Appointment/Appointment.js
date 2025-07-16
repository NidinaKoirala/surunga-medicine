// Appointment.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Appointment.css';
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';
import { AppContext } from '../Context/AppContext';
import NepaliCalendar from '../NepaliCalendar/NepaliCalendar';

const Appointment = () => {
  // Access EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_USER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_USER_TEMPLATE_ID;
  const EMAILJS_ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

  // Get location to access state passed from doctor profile
  const location = useLocation();
  const selectedDoctor = location.state?.selectedDoctor || '';
  
  // Get doctors from context
  const { doctors } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    patientName: '',
    reasonForVisit: '',
    additionalNotes: '',
    provider_name: ''
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: '',
    patientName: ''
  });
  
  const [date, setDate] = useState(new Date());
  const [nepaliDate, setNepaliDate] = useState(null);
  const [time, setTime] = useState('10:00');
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
    showModal: false
  });
  
  // Create a reference to the modal for direct DOM manipulation
  const modalRef = useRef(null);
  
  const form = useRef();

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!nameRegex.test(name.trim())) {
      return 'Name should only contain letters and spaces';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    // Nepal phone number validation - supports both formats: +977-XXXXXXXXX or 98XXXXXXXX
    const phoneRegex = /^(\+977[-\s]?)?[0-9]{10}$/;
    const cleanPhone = phone.replace(/[-\s]/g, '');
    
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    if (!phoneRegex.test(cleanPhone) && !cleanPhone.startsWith('+977')) {
      return 'Please enter a valid phone number (10 digits)';
    }
    
    if (cleanPhone.startsWith('+977') && cleanPhone.length !== 14) {
      return 'Phone number with country code should be 14 digits';
    }
    
    if (!cleanPhone.startsWith('+977') && cleanPhone.length !== 10) {
      return 'Phone number should be 10 digits';
    }
    
    return '';
  };

  // Set the doctor's name when component mounts if passed from doctor profile
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    if (selectedDoctor) {
      setFormData(prevData => ({
        ...prevData,
        provider_name: selectedDoctor
      }));
    }
  }, [selectedDoctor]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));

    // Validate specific fields
    let error = '';
    switch (id) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'patientName':
        error = validateName(value);
        break;
      default:
        break;
    }

    // Update validation errors
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [id]: error
    }));
  };
  
  const handleCalendarChange = (newDate, newNepaliDate) => {
    setDate(newDate);
    setNepaliDate(newNepaliDate);
    setShowTimePicker(true);
  };
  
  // Function to show modal
  const showModal = (success, message) => {
    setFormStatus({
      submitting: false,
      success: success,
      error: !success,
      message: message,
      showModal: true
    });
    
    if (modalRef.current) {
      modalRef.current.style.display = 'flex';
    }
  };
  
  // Function to close modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
    }
    
    setFormStatus(prev => ({...prev, showModal: false}));
  };
  
  const formatAppointmentDate = (date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const patientNameError = validateName(formData.patientName);

    // Update validation errors
    setValidationErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      patientName: patientNameError
    });

    // Check if there are any validation errors
    if (nameError || emailError || phoneError || patientNameError) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please fix the validation errors before submitting',
        showModal: true
      });
      return;
    }
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.patientName || !formData.reasonForVisit) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please fill out all required fields',
        showModal: true
      });
      return;
    }
    
    if (!date || !time) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please select a date and time for your appointment',
        showModal: true
      });
      return;
    }
    
    // Set submitting state
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: 'Submitting your appointment...'
    });
    
    const formattedDate = formatAppointmentDate(date);
    const nepaliFormattedDate = nepaliDate ? nepaliDate.formatted : '';
    
    // First, send confirmation email to the user
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_USER_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        patient_name: formData.patientName,
        reason_for_visit: formData.reasonForVisit,
        appointment_date: formattedDate,
        nepali_appointment_date: nepaliFormattedDate,
        appointment_time: time,
        provider_name: formData.provider_name || 'Available doctor',
        additional_notes: formData.additionalNotes || 'None',
        message: formData.additionalNotes || 'Thank you for booking with Surunga Medicine!',
        survey_link: "https://surungamedicine.com/survey?rating=",
        unsubscribe_link: "https://surungamedicine.com/unsubscribe?email=" + encodeURIComponent(formData.email),
      },
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('User confirmation email sent successfully:', result.text);
      
      // Then send notification email to the admin
      return emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,  // Updated template ID for admin notification
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          patient_name: formData.patientName,
          reason_for_visit: formData.reasonForVisit,
          appointment_date: formattedDate,
          nepali_appointment_date: nepaliFormattedDate,
          appointment_time: time,
          provider_name: formData.provider_name || 'Available doctor',
          additional_notes: formData.additionalNotes || 'None',
          admin_email: ADMIN_EMAIL,
          submission_date: new Date().toLocaleDateString(),
          submission_time: new Date().toLocaleTimeString(),
          _cc: ADMIN_EMAIL, // CC the admin
        },
        EMAILJS_PUBLIC_KEY
      );
    })
    .then((result) => {
      console.log('Admin notification email sent successfully:', result.text);
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        patientName: '',
        reasonForVisit: '',
        additionalNotes: '',
        provider_name: ''
      });
      setValidationErrors({
        name: '',
        email: '',
        phone: '',
        patientName: ''
      });
      setDate(new Date());
      setNepaliDate(null);
      setTime('10:00');
      setShowTimePicker(false);
      
      showModal(true, 'Your appointment has been scheduled successfully! You will receive a confirmation email shortly.');
    })
    .catch((error) => {
      console.error('Error sending email:', error.text);
      showModal(false, 'There was an error scheduling your appointment. Please try again later or contact us directly via call at 023-553097 / 9804964107.');
    });
  };

  // Available time slots
  const availableTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="appointment-container">
      {/* Simple Modal Implementation */}
      <div ref={modalRef} className="modal-overlay" style={{ display: 'none' }}>
        <div className={`simple-modal ${formStatus.success ? 'success-modal' : 'error-modal'}`}>
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <div className="modal-icon">
            {formStatus.success ? '✅' : '❌'}
          </div>
          <h3>{formStatus.success ? 'Success' : 'Error'}</h3>
          <p>{formStatus.message}</p>
          <button onClick={closeModal}>
            {formStatus.success ? 'OK' : 'Try Again'}
          </button>
        </div>
      </div>
      
      <div className="appointment-header">
        <h1>Schedule Your Appointment</h1>
        <p>Please fill out the form below to book your medical consultation</p>
      </div>
      
      <div className="appointment-form-container">
        <form ref={form} className="appointment-form" onSubmit={handleSubmit}>
          
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name*</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={validationErrors.name ? 'error' : ''}
                  required
                />
                {validationErrors.name && (
                  <span className="error-message">{validationErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="Your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  className={validationErrors.email ? 'error' : ''}
                  required
                />
                {validationErrors.email && (
                  <span className="error-message">{validationErrors.email}</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number*</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  placeholder="Your phone number" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={validationErrors.phone ? 'error' : ''}
                  required
                />
                {validationErrors.phone && (
                  <span className="error-message">{validationErrors.phone}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="patientName">Patient Name*</label>
                <input 
                  type="text" 
                  id="patientName" 
                  name="patientName"
                  placeholder="Name of the patient" 
                  value={formData.patientName}
                  onChange={handleChange}
                  className={validationErrors.patientName ? 'error' : ''}
                  required
                />
                {validationErrors.patientName && (
                  <span className="error-message">{validationErrors.patientName}</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reasonForVisit">Reason for Visit*</label>
                <select 
                  id="reasonForVisit" 
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select reason</option>
                  <option value="General Check-up">General Check-up</option>
                  <option value="Follow-up Visit">Follow-up Visit</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Urgent Care">Urgent Care</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Lab Results">Lab Results</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="provider_name">Preferred Doctor</label>
                <select 
                  id="provider_name" 
                  name="provider_name"
                  value={formData.provider_name || ''}
                  onChange={handleChange}
                >
                  <option value="">Any Available Doctor</option>
                  {doctors && doctors.map(doctor => (
                    <option key={doctor._id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Appointment Details</h2>
            <div className="calendar-container">
              <label>Select Date* (मिति छान्नुहोस्)</label>
              
              <div className="nepali-calendar-section">
                <NepaliCalendar 
                  selectedDate={date}
                  onDateSelect={handleCalendarChange}
                />
              </div>
              
              {/* Display selected date */}
              <div className="selected-date-display">
                <div className="english-date">
                  <strong>Selected Date:</strong> {format(date, 'MMMM d, yyyy, EEEE')}
                </div>
                {nepaliDate && (
                  <div className="nepali-date">
                    <strong>नेपाली मिति:</strong> {nepaliDate.formatted}
                  </div>
                )}
              </div>
            </div>
            
            {showTimePicker && (
              <div className="time-picker-container">
                <label>Select Time* (समय छान्नुहोस्)</label>
                <div className="time-slots">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot ${time === slot ? 'selected' : ''}`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {date && time && (
              <div className="selected-datetime">
                <h3>Your Selected Appointment: (तपाईंको छानिएको समय)</h3>
                <div className="appointment-dates">
                  <p><strong>English Date:</strong> {formatAppointmentDate(date)}</p>
                  {nepaliDate && (
                    <p><strong>नेपाली मिति:</strong> {nepaliDate.formatted}</p>
                  )}
                  <p><strong>Time (समय):</strong> {time}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea 
              id="additionalNotes" 
              name="additionalNotes"
              rows="4" 
              placeholder="Any additional information you'd like to share"
              value={formData.additionalNotes}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={formStatus.submitting || !date || !time}
          >
            {formStatus.submitting ? 'Scheduling Please Donot Refresh...' : 'Schedule Appointment'}
          </button>
        </form>
      </div>
      
      <div className="appointment-info">
        <h2>What to Expect</h2>
        <ul>
          <li>Please arrive 15 minutes before your scheduled appointment time</li>
          <li>Bring your ID and insurance information if applicable</li>
          <li>If you need to cancel, please provide at least 24 hours notice</li>
          <li>For urgent matters, please call our office directly at 023-553097 / 9804964107</li>
        </ul>
      </div>
    </div>
  );
};

export default Appointment;