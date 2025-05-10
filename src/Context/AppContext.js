import React, { createContext, useState } from 'react';
import doc1 from '../assets/images/Doctors/dr.dipayan.panday.png';
import doc2 from '../assets/images/Doctors/dr.lata.png';
import doc3 from '../assets/images/Doctors/doc3.png';
import doc4 from '../assets/images/Doctors/doc4.png';
import doc5 from '../assets/images/Doctors/doc5.png';
import doc6 from '../assets/images/Doctors/doc6.png';
import doc7 from '../assets/images/Doctors/doc7.png';
import doc8 from '../assets/images/Doctors/doc8.png';
import doc9 from '../assets/images/Doctors/doc9.png';
import doc10 from '../assets/images/Doctors/doc10.png';
import doc11 from '../assets/images/Doctors/doc11.png';
import doc12 from '../assets/images/Doctors/doc12.png';
import doc13 from '../assets/images/Doctors/doc13.png';
import doc14 from '../assets/images/Doctors/doc14.png';
import doc15 from '../assets/images/Doctors/doc15.png';
import Dermatologist from '../assets/images/specialitymenu/Dermatologist.svg';
import Gastroenterologist from '../assets/images/specialitymenu/Gastroenterologist.svg';
import General_physician from '../assets/images/specialitymenu/General_physician.svg';
import Gynecologist from '../assets/images/specialitymenu/Gynecologist.svg';
import Neurologist from '../assets/images/specialitymenu/Neurologist.svg';
import Pediatricians from '../assets/images/specialitymenu/Pediatricians.svg';

// Create context
export const AppContext = createContext();

// Default doctor image mapping for new doctors
const defaultDoctorImages = {
  'General physician': doc3,
  'प्रसूति तथा प्रजनन': doc2,
  'छाला यौन तथा सुन्दर्य विशेषज्ञ': doc1,
  'Pediatricians': doc4,
  'Neurologist': doc5,
  'Gastroenterologist': doc6
};

// Create provider
export const AppProvider = ({ children }) => {
    // Define speciality data
    const specialityData = [
        {
            speciality: 'General physician',
            image: General_physician
        },
        {
            speciality: 'प्रसूति तथा प्रजनन',
            image: Gynecologist
        },
        {
            speciality: 'छाला यौन तथा सुन्दर्य विशेषज्ञ',
            image: Dermatologist
        },
        {
            speciality: 'Pediatricians',
            image: Pediatricians
        },
        {
            speciality: 'Neurologist',
            image: Neurologist
        },
        {
            speciality: 'Gastroenterologist',
            image: Gastroenterologist
        },
    ];

    // Initial doctors data
    const initialDoctorsData = [
        {
            _id: 'doc1',
            name: 'डा. दिपायन पाण्डे',
            image: doc1,
            speciality: 'छाला यौन तथा सुन्दर्य विशेषज्ञ',
            degree: 'MBBS, MD (BPKHS Dharan)',
            experience: '10 Years',
            about: 'डा. दिपायन पाण्डे, MBBS, MD (BPKHS धरान) - आदरणीय बरिस्ट छाला, यौन तथा सुन्दर्य विशेषज्ञ हुनुहुन्छ जसले ४ वर्षको समर्पित अनुभवका साथ छालाका जटिल रोगहरू, यौन स्वास्थ्य समस्याहरू र उन्नत सौन्दर्य प्रक्रियाहरूमा विशेष ध्यान दिई उच्च गुणस्तरीय स्वास्थ्य सेवा प्रदान गर्नुहुन्छ।',
            fees: 'Free',
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            }
        },
        {
            _id: 'doc2',
            name: 'डा. लता श्रेष्ठ',
            image: doc2,
            speciality: 'प्रसूति तथा प्रजनन',
            degree: 'MBBS (NMCTCH), MD OBS/GYN (JRRMMC)',
            experience: '10 Years',
            about: 'डा. लता श्रेष्ठ, MBBS (NMCTCH), MD OBS/GYN (JRRMMC) - आदरणीय बरिस्ट प्रसूति तथा प्रजनन विशेषज्ञ हुनुहुन्छ जसले IVF विशेषज्ञताका साथ महिलाहरूको प्रजनन स्वास्थ्य, गर्भावस्था व्यवस्थापन र बाँझोपन उपचारमा उत्कृष्ट सेवा प्रदान गर्नुहुन्छ, प्रत्येक बिरामीलाई व्यक्तिगत हेरचाह र समर्थन दिनुहुन्छ।',
            fees: 'Free',
            address: {
                line1: '27th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc3',
            name: 'Dr. Sarah Patel',
            image: doc3,
            speciality: 'Dermatologist',
            degree: 'MBBS',
            experience: '1 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 30,
            address: {
                line1: '37th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc4',
            name: 'Dr. Christopher Lee',
            image: doc4,
            speciality: 'Pediatricians',
            degree: 'MBBS',
            experience: '2 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 40,
            address: {
                line1: '47th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc5',
            name: 'Dr. Jennifer Garcia',
            image: doc5,
            speciality: 'Neurologist',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '57th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc6',
            name: 'Dr. Andrew Williams',
            image: doc6,
            speciality: 'Neurologist',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '57th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc7',
            name: 'Dr. Christopher Davis',
            image: doc7,
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '17th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc8',
            name: 'Dr. Timothy White',
            image: doc8,
            speciality: 'Gynecologist',
            degree: 'MBBS',
            experience: '3 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 60,
            address: {
                line1: '27th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc9',
            name: 'Dr. Ava Mitchell',
            image: doc9,
            speciality: 'Dermatologist',
            degree: 'MBBS',
            experience: '1 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 30,
            address: {
                line1: '37th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc10',
            name: 'Dr. Jeffrey King',
            image: doc10,
            speciality: 'Pediatricians',
            degree: 'MBBS',
            experience: '2 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 40,
            address: {
                line1: '47th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc11',
            name: 'Dr. Zoe Kelly',
            image: doc11,
            speciality: 'Neurologist',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '57th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc12',
            name: 'Dr. Patrick Harris',
            image: doc12,
            speciality: 'Neurologist',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '57th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc13',
            name: 'Dr. Chloe Evans',
            image: doc13,
            speciality: 'General physician',
            degree: 'MBBS',
            experience: '4 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 50,
            address: {
                line1: '17th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc14',
            name: 'Dr. Ryan Martinez',
            image: doc14,
            speciality: 'Gynecologist',
            degree: 'MBBS',
            experience: '3 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 60,
            address: {
                line1: '27th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
        {
            _id: 'doc15',
            name: 'Dr. Amelia Hill',
            image: doc15,
            speciality: 'Dermatologist',
            degree: 'MBBS',
            experience: '1 Years',
            about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
            fees: 30,
            address: {
                line1: '37th Cross, Richmond',
                line2: 'Circle, Ring Road, London'
            }
        },
    ];

    // State to store the current list of doctors
    const [doctors, setDoctors] = useState(initialDoctorsData);

    // Function to add a new doctor
    const addDoctor = (newDoctorData) => {
        // Generate a unique ID (can be more sophisticated in production)
        const newId = `doc${doctors.length + 1}`;
        
        // If no image is provided, use a default based on speciality
        const doctorImage = newDoctorData.image || 
            defaultDoctorImages[newDoctorData.speciality] || 
            doc1;
        
        // Create the new doctor object
        const newDoctor = {
            _id: newId,
            ...newDoctorData,
            image: doctorImage
        };
        
        // Add the new doctor to the state
        setDoctors([...doctors, newDoctor]);
        
        return newId; // Return the new ID for reference
    };
    
    // Function to update an existing doctor
    const updateDoctor = (doctorId, updatedData) => {
        // Find the doctor to update
        const doctorIndex = doctors.findIndex(doc => doc._id === doctorId);
        
        if (doctorIndex === -1) {
            console.error(`Doctor with ID ${doctorId} not found`);
            return false;
        }
        
        // Create updated doctor object
        const updatedDoctor = {
            ...doctors[doctorIndex],
            ...updatedData
        };
        
        // Create a new array with the updated doctor
        const updatedDoctors = [...doctors];
        updatedDoctors[doctorIndex] = updatedDoctor;
        
        // Update state
        setDoctors(updatedDoctors);
        return true;
    };
    
    // Function to delete a doctor
    const deleteDoctor = (doctorId) => {
        // Find the doctor to delete
        const doctorIndex = doctors.findIndex(doc => doc._id === doctorId);
        
        if (doctorIndex === -1) {
            console.error(`Doctor with ID ${doctorId} not found`);
            return false;
        }
        
        // Filter out the doctor to delete
        const filteredDoctors = doctors.filter(doc => doc._id !== doctorId);
        
        // Update state
        setDoctors(filteredDoctors);
        return true;
    };
    
    // Function to get a doctor by ID
    const getDoctorById = (doctorId) => {
        return doctors.find(doc => doc._id === doctorId) || null;
    };

    return (
        <AppContext.Provider value={{ 
            doctors, 
            specialityData,
            addDoctor,
            updateDoctor,
            deleteDoctor,
            getDoctorById
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;