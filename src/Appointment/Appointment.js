import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { useLocation, useParams, useNavigate as useRouterNavigate } from 'react-router-dom';
import './Appointment.css';
import emailjs from '@emailjs/browser';
import { format } from 'date-fns';
import { AppContext } from '../Context/AppContext';
import NepaliCalendar from '../NepaliCalendar/NepaliCalendar';

// Helper function to convert URL-friendly name back to proper doctor name
const urlToProperName = (urlName, doctors) => {
  if (!urlName || !doctors) return '';
  
  // Try to find doctor by matching URL pattern
  const foundDoctor = doctors.find(doc => {
    const docUrlName = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return docUrlName === urlName.toLowerCase();
  });
  
  return foundDoctor ? foundDoctor.name : '';
};

// Helper function to convert proper name to URL-friendly format
const properNameToUrl = (properName) => {
  if (!properName) return '';
  return properName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const Appointment = () => {
  // Access EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_USER_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_USER_TEMPLATE_ID;
  const EMAILJS_ADMIN_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

  // Get location and params to access state passed from doctor profile
  const location = useLocation();
  const { doctorName } = useParams();
  const navigateRouter = useRouterNavigate();
  
  // Get functions from context
  const { 
    doctors, 
    isDoctorAvailableOnDate, 
    getDoctorAvailableSlots 
  } = useContext(AppContext);
  
  // Convert URL-friendly name back to proper doctor name
  const selectedDoctorName = doctorName 
    ? urlToProperName(doctorName, doctors) 
    : location.state?.selectedDoctor || '';

  // Helper function to get day name from date
  const getDayName = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  // CORRECTED: Helper function to normalize date (same as AppContext)
  const normalizeDate = (date) => {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    if (date instanceof Date) {
      // FIXED: Use local timezone methods to avoid "+1 day" issue
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  };

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
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
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

  // Enhanced validation functions
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s\u0900-\u097F]+$/; // Added Devanagari support
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (name.trim().length > 50) {
      return 'Name cannot exceed 50 characters';
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
    if (email.length > 100) {
      return 'Email cannot exceed 100 characters';
    }
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    // Enhanced Nepal phone number validation
    const cleanPhone = phone.replace(/[-\s]/g, '');
    const nepaliMobileRegex = /^(98|97)\d{8}$/; // Nepali mobile numbers
    const landlineRegex = /^0\d{2,3}-?\d{6,7}$/; // Nepali landline numbers
    const internationalRegex = /^\+977(98|97)\d{8}$/; // International format
    
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    if (phone.length > 20) {
      return 'Phone number cannot exceed 20 characters';
    }
    
    if (!nepaliMobileRegex.test(cleanPhone) && 
        !landlineRegex.test(phone) && 
        !internationalRegex.test(cleanPhone)) {
      return 'Please enter a valid Nepali phone number (e.g., 9841234567)';
    }
    
    return '';
  };

    const updateAvailableTimeSlots = useCallback((doctorId, selectedDate) => {
      console.log(`🕐 UPDATING TIME SLOTS for doctor ${doctorId} on ${normalizeDate(selectedDate)}`);
      
      if (!doctorId || !selectedDate) {
        console.log(`❌ Missing doctor ID or date`);
        setAvailableTimeSlots([]);
        return;
      }

      try {
        const slots = getDoctorAvailableSlots(doctorId, selectedDate);
        console.log(`🕐 Available slots returned:`, slots);
        setAvailableTimeSlots(slots);
        
        // Reset selected time if it's not available for the new date
        if (time && !slots.includes(time)) {
          console.log(`🕐 Resetting selected time ${time} (not available in new slots)`);
          setTime('');
        }
      } catch (error) {
        console.error('❌ Error updating available time slots:', error);
        setAvailableTimeSlots([]);
      }
    }, [getDoctorAvailableSlots, time]);

  // Scroll to top only when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Set the doctor's name when component mounts if passed from doctor profile
  useEffect(() => {
    if (selectedDoctorName) {
      setFormData(prevData => ({
        ...prevData,
        provider_name: selectedDoctorName
      }));
      
      // Find the doctor object
      const doctor = doctors.find(doc => doc.name === selectedDoctorName);
      if (doctor) {
        setSelectedDoctor(doctor);
        console.log('🏥 PRE-SELECTED DOCTOR:', doctor.name);
        console.log('🏥 Doctor availability config:', doctor.availability);
      }
    }
  }, [selectedDoctorName, doctors]);
  
  // Update time slots when doctor or date changes
    useEffect(() => {
      if (selectedDoctor && date) {
        console.log(`🔄 useEffect: Updating slots for ${selectedDoctor.name} on ${normalizeDate(date)}`);
        updateAvailableTimeSlots(selectedDoctor._id, date);
      }
    }, [selectedDoctor, date, updateAvailableTimeSlots]);

  // Handle form input changes with enhanced validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Update form data
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));

    // Handle doctor selection change
    if (id === 'provider_name') {
      const doctor = doctors.find(doc => doc.name === value) || null;
      setSelectedDoctor(doctor);
      setTime(''); // Reset time when doctor changes
      setShowTimePicker(false);
      
      // Update URL with selected doctor
      if (doctor) {
        const urlFriendlyName = properNameToUrl(doctor.name);
        navigateRouter(`/Appointment/${urlFriendlyName}`, { replace: true });
        
        console.log('🏥 DOCTOR SELECTION CHANGED');
        console.log('   Selected:', doctor.name);
        console.log('   ID:', doctor._id);
        console.log('   Availability:', doctor.availability);
        
        // Check availability for current date
        const isAvailable = isDoctorAvailableOnDate(doctor._id, date);
        console.log(`   Available on current date: ${isAvailable}`);
        
        if (isAvailable) {
          updateAvailableTimeSlots(doctor._id, date);
          setShowTimePicker(true);
        } else {
          setAvailableTimeSlots([]);
          setShowTimePicker(false);
        }
      } else {
        // If no doctor selected, go back to base appointment URL
        navigateRouter('/Appointment', { replace: true });
        setAvailableTimeSlots([]);
        setShowTimePicker(false);
      }
    }
    // Real-time validation with debouncing
    let error = '';
    switch (id) {
      case 'name':
      case 'patientName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
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
  
  // CORRECTED: Handle calendar date change with proper precedence logic
  const handleCalendarChange = (newDate, newNepaliDate) => {
    const dateString = normalizeDate(newDate);
    const dayName = getDayName(newDate);
    
    console.log('📅 CALENDAR DATE CHANGE');
    console.log(`   New date: ${dateString} (${dayName})`);
    console.log(`   Selected doctor: ${selectedDoctor?.name || 'None'}`);
    
    setDate(newDate);
    setNepaliDate(newNepaliDate);
    setTime(''); // Reset time when date changes
    
    // Check if selected doctor is available on this date
    if (selectedDoctor) {
      try {
        console.log('📅 Checking availability for doctor:', selectedDoctor.name);
        const isAvailable = isDoctorAvailableOnDate(selectedDoctor._id, newDate);
        console.log(`📅 Doctor available on ${dateString}: ${isAvailable}`);
        
        setShowTimePicker(isAvailable);
        
        if (isAvailable) {
          // Update time slots immediately
          updateAvailableTimeSlots(selectedDoctor._id, newDate);
        } else {
          console.log(`📅 No time slots - doctor not available`);
          setAvailableTimeSlots([]);
        }
      } catch (error) {
        console.error('❌ Error checking doctor availability:', error);
        setShowTimePicker(false);
        setAvailableTimeSlots([]);
      }
    } else {
      console.log(`📅 No doctor selected - allowing date selection`);
      setShowTimePicker(true);
      setAvailableTimeSlots([]);
    }
  };

  // CORRECTED: Function to check if a date should be disabled in the calendar
  const isDateDisabled = (date) => {
    // Don't allow past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // If no doctor is selected, allow all future dates
    if (!selectedDoctor) return false;

    try {
      // Check if doctor is available on this date using corrected logic
      const isAvailable = isDoctorAvailableOnDate(selectedDoctor._id, date);
      const dateString = normalizeDate(date);
      const dayName = getDayName(date);
      
      // Debug logging for specific doctors - CORRECTED to show more info
      if (selectedDoctor.name === 'Dr. Rabindra Simkhada') {
        console.log(`🔍 CALENDAR DISABLE CHECK for ${selectedDoctor.name}`);
        console.log(`   Date: ${dateString} (${dayName})`);
        console.log(`   Available: ${isAvailable}`);
        console.log(`   Will disable: ${!isAvailable}`);
        
        // ADDITIONAL: Show available dates for reference
        if (selectedDoctor.availability?.availableDates) {
          console.log(`   Doctor's ALL available dates:`, selectedDoctor.availability.availableDates);
        }
      }
      
      return !isAvailable; // Disabled if NOT available
    } catch (error) {
      console.error('❌ Error checking if date is disabled:', error);
      return true; // Disable date on error for safety
    }
  };

  // Handle time slot selection
  const handleTimeSlotSelection = (selectedTime) => {
    console.log(`⏰ Time slot selected: ${selectedTime}`);
    setTime(selectedTime);
  };
  
  // Function to show modal with enhanced animations
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
      // Add animation class
      modalRef.current.classList.add('modal-show');
    }
  };
  
  // Function to close modal
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('modal-hide');
      setTimeout(() => {
        modalRef.current.style.display = 'none';
        modalRef.current.classList.remove('modal-show', 'modal-hide');
      }, 300);
    }
    
    setFormStatus(prev => ({...prev, showModal: false}));
  };
  
  // Enhanced date formatting
  const formatAppointmentDate = (date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  // Enhanced form submission with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Form submission started');
    
    // Validate all fields before submission
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const patientNameError = validateName(formData.patientName);

    // Update validation errors
    const errors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
      patientName: patientNameError
    };
    
    setValidationErrors(errors);

    // Check if there are any validation errors
    const hasValidationErrors = Object.values(errors).some(error => error !== '');
    if (hasValidationErrors) {
      showModal(false, 'Please fix the validation errors before submitting');
      return;
    }
    
    // Basic field validation
    if (!formData.name || !formData.email || !formData.phone || !formData.patientName || !formData.reasonForVisit) {
      showModal(false, 'Please fill out all required fields');
      return;
    }
    
    if (!date || !time) {
      showModal(false, 'Please select a date and time for your appointment');
      return;
    }

    // Enhanced availability check
    if (selectedDoctor) {
      try {
        if (!availableTimeSlots.includes(time)) {
          showModal(false, 'Selected time slot is not available for the chosen doctor. Please select a different time.');
          return;
        }
      } catch (error) {
        console.error('❌ Error validating time slot:', error);
        showModal(false, 'Error validating appointment time. Please try again.');
        return;
      }
    }
    
    // Set submitting state
    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: 'Scheduling your appointment...'
    });
    
    try {
      const formattedDate = formatAppointmentDate(date);
      const nepaliFormattedDate = nepaliDate ? nepaliDate.formatted : '';
      
      console.log('📧 Sending appointment emails...');
      
      // First, send confirmation email to the user
      const userEmailResult = await emailjs.send(
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
      );
      
      console.log('✅ User confirmation email sent successfully:', userEmailResult.text);
      
      // Then send notification email to the admin
      const adminEmailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
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
          _cc: ADMIN_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('✅ Admin notification email sent successfully:', adminEmailResult.text);
      
      // Reset form on success
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
      setTime('');
      setShowTimePicker(false);
      setSelectedDoctor(null);
      setAvailableTimeSlots([]);
      
      showModal(true, 'Your appointment has been scheduled successfully! You will receive a confirmation email shortly. Thank you for choosing Surunga Medicine!');
      
    } catch (error) {
      console.error('❌ Error sending appointment emails:', error);
      
      // Enhanced error message based on error type
      let errorMessage = 'There was an error scheduling your appointment. ';
      if (error.text && error.text.includes('network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else if (error.text && error.text.includes('rate limit')) {
        errorMessage += 'Too many requests. Please wait a moment and try again.';
      } else {
        errorMessage += 'Please try again later or contact us directly at 023-553097 / 9804964107.';
      }
      
      showModal(false, errorMessage);
    }
  };

  // Helper function to get availability status text
  const getAvailabilityStatusText = () => {
    if (!selectedDoctor) {
      return null;
    }

    const isAvailable = isDoctorAvailableOnDate(selectedDoctor._id, date);
    
    if (!isAvailable) {
      return (
        <div className="unavailable-notice">
          <p>Doctor {selectedDoctor.name} is not available on {format(date, 'EEEE, MMMM d, yyyy')}. Please select another date.</p>
          {selectedDoctor.availability?.availableDates && selectedDoctor.availability.availableDates.length > 0 && (
            <div className="available-dates-info">
              <p><strong>Next available dates:</strong></p>
              <div className="available-dates-list">
                {/* CORRECTED: Show more dates, not just first 5 */}
                {selectedDoctor.availability.availableDates.slice(0, 8).map(dateStr => (
                  <span key={dateStr} className="available-date-chip">
                    {format(new Date(dateStr + 'T00:00:00'), 'MMM d')}
                  </span>
                ))}
                {selectedDoctor.availability.availableDates.length > 8 && (
                  <span className="more-dates">+{selectedDoctor.availability.availableDates.length - 8} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="appointment-container">
      {/* Enhanced Modal Implementation */}
      <div ref={modalRef} className="modal-overlay" style={{ display: 'none' }}>
        <div className={`simple-modal ${formStatus.success ? 'success-modal' : 'error-modal'}`}>
          <button className="modal-close" onClick={closeModal} aria-label="Close modal">
            &times;
          </button>
          <div className="modal-icon">
            {formStatus.success ? '✓' : '✗'}
          </div>
          <h3>{formStatus.success ? 'Success!' : 'Error'}</h3>
          <p>{formStatus.message}</p>
          <button onClick={closeModal}>
            {formStatus.success ? 'Great!' : 'Try Again'}
          </button>
        </div>
      </div>
      
      <div className="appointment-header">
        <h1>Schedule Your Appointment</h1>
        <p>Book your medical consultation with our expert doctors. Fill out the form below to secure your preferred time slot.</p>
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
                  placeholder="Enter your full name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={validationErrors.name ? 'error' : ''}
                  required
                  maxLength="50"
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
                  placeholder="Enter your email address" 
                  value={formData.email}
                  onChange={handleChange}
                  className={validationErrors.email ? 'error' : ''}
                  required
                  maxLength="100"
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
                  placeholder="e.g., 9841234567 or 023-553097" 
                  value={formData.phone}
                  onChange={handleChange}
                  className={validationErrors.phone ? 'error' : ''}
                  required
                  maxLength="20"
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
                  placeholder="Name of the patient (can be same as your name)" 
                  value={formData.patientName}
                  onChange={handleChange}
                  className={validationErrors.patientName ? 'error' : ''}
                  required
                  maxLength="50"
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
                  <option value="">Select reason for your visit</option>
                  <option value="General Check-up">General Check-up</option>
                  <option value="Follow-up Visit">Follow-up Visit</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Urgent Care">Urgent Care</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Lab Results Discussion">Lab Results Discussion</option>
                  <option value="Prescription Refill">Prescription Refill</option>
                  <option value="Specialist Consultation">Specialist Consultation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="provider_name">Preferred Doctor*</label>
                <select 
                  id="provider_name" 
                  name="provider_name"
                  value={formData.provider_name || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Doctor</option>
                  {doctors && doctors.map(doctor => (
                    <option key={doctor._id} value={doctor.name}>
                      {doctor.name} - {doctor.speciality}
                    </option>
                  ))}
                </select>
                {selectedDoctor && selectedDoctor.availability && selectedDoctor.availability.note && (
                  <small className="availability-note">
                    📅 {selectedDoctor.availability.note}
                  </small>
                )}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Appointment Details</h2>
            
            {!selectedDoctor ? (
              <div className="doctor-selection-notice">
                <p>🏥 Please select a doctor first to see available dates and times.</p>
              </div>
            ) : (
              <>
                <div className="calendar-container">
                  <label>Select Date* (मिति छान्नुहोस्)</label>
                  
                  <div className="nepali-calendar-section">
                    <NepaliCalendar 
                      selectedDate={date}
                      onDateSelect={handleCalendarChange}
                      isDateDisabled={isDateDisabled}
                    />
                  </div>
                  
                  {/* Display selected date */}
                  <div className="selected-date-display">
                    <div className="english-date">
                      <strong>Selected Date:</strong> {format(date, 'EEEE, MMMM d, yyyy')}
                    </div>
                    {nepaliDate && (
                      <div className="nepali-date">
                        <strong>नेपाली मिति:</strong> {nepaliDate.formatted}
                      </div>
                    )}
                    {getAvailabilityStatusText()}
                  </div>
                </div>
                
                {/* Time Picker Section */}
                {showTimePicker && selectedDoctor && (
                  <>
                    {availableTimeSlots.length > 0 ? (
                      <div className="time-picker-container">
                        <label>Select Time* (समय छान्नुहोस्)</label>
                        <div className="time-slots-info">
                          <p>✅ Available times for {selectedDoctor.name} on {format(date, 'EEEE, MMMM d')}:</p>
                        </div>
                        <div className="time-slots">
                          {availableTimeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`time-slot ${time === slot ? 'selected' : 'available'}`}
                              onClick={() => handleTimeSlotSelection(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {availableTimeSlots.length > 0 && (
                          <small className="time-slots-note">
                            📍 All times are in Nepal Standard Time (NST). Click on a time to select it.
                          </small>
                        )}
                      </div>
                    ) : (
                      <div className="no-slots-notice">
                        <h3>⏰ No Time Slots Available</h3>
                        <p>
                          {isDoctorAvailableOnDate(selectedDoctor._id, date) 
                            ? `${selectedDoctor.name} should be available on ${format(date, 'EEEE, MMMM d, yyyy')} but no time slots were found. This might be a configuration issue.`
                            : `${selectedDoctor.name} is not available on ${format(date, 'EEEE, MMMM d, yyyy')}. Please select a different date.`
                          }
                        </p>
                        
                        {/* Show suggested dates if specific dates are configured */}
                        {selectedDoctor.availability?.availableDates && selectedDoctor.availability.availableDates.length > 0 && (
                          <div className="date-suggestion">
                            <p><strong>📅 Available dates for {selectedDoctor.name}:</strong></p>
                            <div className="suggested-dates">
                              {selectedDoctor.availability.availableDates.slice(0, 10).map(dateStr => {
                                const suggestedDate = new Date(dateStr + 'T00:00:00');
                                return (
                                  <button 
                                    key={dateStr} 
                                    type="button" 
                                    className="suggested-date-btn"
                                    onClick={() => {
                                      console.log(`📅 Suggested date clicked: ${dateStr}`);
                                      // User can click in calendar instead
                                    }}
                                  >
                                    {format(suggestedDate, 'MMM d')}
                                  </button>
                                );
                              })}
                              {selectedDoctor.availability.availableDates.length > 10 && (
                                <span className="more-dates-indicator">
                                  +{selectedDoctor.availability.availableDates.length - 10} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                
                {!showTimePicker && selectedDoctor && (
                  <div className="no-availability-notice">
                    <p>❌ {selectedDoctor.name} is not available on the selected date. Please choose a different date.</p>
                  </div>
                )}
              </>
            )}
            
            {/* Selected appointment summary */}
            {date && time && selectedDoctor && (
              <div className="selected-datetime">
                <h3>✅ Your Selected Appointment (तपाईंको छानिएको समय)</h3>
                <div className="appointment-dates">
                  <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                  <p><strong>Speciality:</strong> {selectedDoctor.speciality}</p>
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
            <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
            <textarea 
              id="additionalNotes" 
              name="additionalNotes"
              rows="4" 
              placeholder="Any additional information, symptoms, or special requirements you'd like to share with the doctor"
              value={formData.additionalNotes}
              onChange={handleChange}
              maxLength="500"
            ></textarea>
            <small style={{ color: 'var(--gray-500)', fontSize: '0.85rem' }}>
              {500 - (formData.additionalNotes?.length || 0)} characters remaining
            </small>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={formStatus.submitting || !date || !time || !selectedDoctor}
          >
            {formStatus.submitting ? 
              'Scheduling Please Do not Refresh...' : 
              'Schedule Appointment'
            }
          </button>
        </form>
      </div>
      
      <div className="appointment-info">
        <h2>What to Expect</h2>
        <ul>
          <li>Please arrive 15 minutes before your scheduled appointment time for check-in and registration</li>
          <li>Bring your valid ID, insurance information (if applicable), and any relevant medical records</li>
          <li>If you need to cancel or reschedule, please provide at least 24 hours notice to avoid cancellation fees</li>
          <li>For urgent medical matters or same-day appointments, please call our office directly at 023-553097 / 9804964107</li>
          <li>Our staff will send you a confirmation SMS and email with appointment details and any preparation instructions</li>
          <li>Payment can be made via cash, digital wallets, or card at the clinic after your consultation</li>
        </ul>
      </div>
    </div>
  );
};

export default Appointment;