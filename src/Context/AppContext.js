import React, { createContext, useState } from 'react';

import maledoctoravatar from '../assets/images/Doctors/doc-avatar-male.png';
import femaledoctoravatar from '../assets/images/Doctors/doc-avatar-female.png';
import doc1 from '../assets/images/Doctors/dr.dipayan.panday.png';
import doc2 from '../assets/images/Doctors/dr.lata.png';
import doc3 from '../assets/images/Doctors/dr.gaurav.png';
import doc5 from '../assets/images/Doctors/dr.pravakar.shah.png';
import doc6 from '../assets/images/Doctors/dr.ram.giri.png';
import doc7 from '../assets/images/Doctors/dr.rabindra.png';
import doc8 from '../assets/images/Doctors/dr.sandeep.png';
import doc9 from '../assets/images/Doctors/dr.sasank.raj.png';
import doc4 from '../assets/images/Doctors/dr.pramod.kumar.shah.png';
import doc10 from '../assets/images/Doctors/dr.santosh.png';



import Dermatologist from '../assets/images/specialitymenu/Dermatologist.svg';
import bonespecialist from '../assets/images/specialitymenu/bonespecialist.png';
import Gynecologist from '../assets/images/specialitymenu/Gynecologist.svg';
import KidneySpecialist from '../assets/images/specialitymenu/Kidney-Specialist.png';
import GeneralLaparoscopicSurgeon from '../assets/images/specialitymenu/General-Laparoscopic-Surgeon.png';
import HeartSpecialist from '../assets/images/specialitymenu/Heart-Specialist.png';
import Immunologist from '../assets/images/specialitymenu/Immunologist.png';
import Endocrinologist from '../assets/images/specialitymenu/Endocrinologist.png';
import MentalHealthSpecialist from '../assets/images/specialitymenu/MentalHealthSpecialist.png';
import General_physician from '../assets/images/specialitymenu/General_physician.svg';

// Create context
export const AppContext = createContext();

// Default doctor image mapping for new doctors
const defaultDoctorImages = {
  'वाथ तथा प्रतिरक्षा रोग विशेषज्ञ': doc6,
  'प्रसूति तथा प्रजनन् विशेषज्ञ': doc2,
  'छाला यौन तथा सौन्दर्य विशेषज्ञ': doc1,
  'वरिष्ठ कन्सल्टेन्ट फिजिसियन': doc9,
  'जनरल तथा त्याप्रोस्कोपिक सर्जन र पायल्स रोग विशेषज्ञ': doc5,
  'सुगर प्रेसर तथा किड्नी विशेषज्ञ': doc3,
  'मुटृुरोग विशेषज्ञ': doc7,
  'सुगर थाइराईड तथा हर्मोन विशेषज्ञ': doc8,
  'हाडजोर्नी नशा तथा मेरुदण्ड विशेषज्ञ': doc3
};

// Create provider
export const AppProvider = ({ children }) => {
    // Define speciality data
    const specialityData = [
        {
            speciality: 'प्रसूति तथा प्रजनन् विशेषज्ञ',
            image: Gynecologist
        },
        {
            speciality: 'छाला यौन तथा सौन्दर्य विशेषज्ञ',
            image: Dermatologist
        },
        {
            speciality: 'हाडजोर्नी नशा तथा मेरुदण्ड विशेषज्ञ',
            image: bonespecialist
        },
        {
            speciality: 'जनरल तथा त्याप्रोस्कोपिक सर्जन र पायल्स रोग विशेषज्ञ',
            image: GeneralLaparoscopicSurgeon
        },
        {
            speciality: 'सुगर प्रेसर तथा किड्नी विशेषज्ञ',
            image: KidneySpecialist
        },
        {
            speciality: 'मुटृुरोग विशेषज्ञ',
            image: HeartSpecialist
        },   
        {
            speciality: 'वाथ तथा प्रतिरक्षा रोग विशेषज्ञ',
            image: Immunologist
        },  
        {
            speciality: 'सुगर थाइराईड तथा हर्मोन विशेषज्ञ',
            image: Endocrinologist
        },
        {
            speciality: 'मानसिक, नशा तथा टाउको रोग विशेषज्ञ',
            image: MentalHealthSpecialist
        },      
        {
            speciality: 'वरिष्ठ कन्सल्टेन्ट फिजिसियन',
            image: General_physician
        },                  
    ];

    // Initial doctors data with availability
    const initialDoctorsData = [
        {
            _id: 'doc1',
            name: 'Dr. Dipayan Pandey',
            image: doc1,
            speciality: 'छाला यौन तथा सौन्दर्य विशेषज्ञ',
            degree: 'MBBS, MD (BPKHS Dharan)',
            experience: '10+ Years',
            about: 'शौन्दर्य विशेषज्ञ डा. दिपायन पाण्डे  12 + वर्षको अनुभव र लामो समय अनुसन्धानमा रहेर उत्कृष्ठ नतिजा निकाल्न सफल डाक्टर दिपायन पाण्डे अव सुरुङ्गामा प्रत्येक विहिबार विहान आउनु हुन्छ। मौका को फाईदा उठाउन नभुल्नु होला प्रत्येक हप्ता आउने भएकाले फलोअप पनि सजिलो हुने र तपाईंको सेवा मा कुनै कमी नरहने हुँदा विशेषज्ञ डाक्टर राम्ररी चिनौ हल्लाको भरमा नपरी, समयमै उपचार गरौं । समयमा ध्यान नदिनाले अनुहार कुरूप बन्न सक्छ । समय अनुसार साथै मौसम अनुसार अनुहारका Cream/Lotion परिवर्तन हुन सक्छन एउटै Cream /lotion लै सध वै काम नदिन सक्छ त्यसैले विशेषज्ञ डाक्टर देखाउने बानी बसालौ । Note: यहाँ उपलब्ध सेवा हरु अत्याधुनिक लेन्सको सहायताले अनुहाको चाया, पोतो, ढन्डिफोर, दाद आदिको प्रकार छुटाई उपचार गरिन्छ ।',
            specialties: [
                'छाला रोग निदान र उपचार',
                'अनुहारको सौन्दर्य उपचार',
                'दाद र छाला संक्रमण',
                'ढन्डिफोर उपचार',
                'आधुनिक छाला विश्लेषण',
                'सौन्दर्य परामर्श'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'thursday': ['08:00']
                },
                monthlySchedule: null,
                note: 'Available every Thursday at 8 AM'
            }
        },
        {
            _id: 'doc2',
            name: 'Dr. Lata Shrestha',
            image: doc2,
            speciality: 'प्रसूति तथा प्रजनन् विशेषज्ञ',
            degree: 'MBBS (NMCTCH), MD OBS/GYN (JRRMMC)',
            experience: '10+ Years',
            about: 'डा. लता श्रेष्ठ, MBBS (NMCTCH), MD OBS/GYN (JRRMMC) - आदरणीय बरिस्ट प्रसूति तथा प्रजनन् विशेषज्ञ हुनुहुन्छ जसले IVF विशेषज्ञताका साथ महिलाहरूको प्रजनन् स्वास्थ्य, गर्भावस्था व्यवस्थापन र बाँझोपन उपचारमा उत्कृष्ट सेवा प्रदान गर्नुहुन्छ, प्रत्येक बिरामीलाई व्यक्तिगत हेरचाह र समर्थन दिनुहुन्छ।',
            specialties: [
                'IVF र प्रजनन् उपचार',
                'गर्भावस्था व्यवस्थापन',
                'बाँझोपन उपचार',
                'महिला प्रजनन् स्वास्थ्य',
                'प्रसूति सेवा',
                'स्त्री रोग परामर्श'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'monday': ['12:00', '13:00'],
                    'tuesday': ['12:00', '13:00'],
                    'wednesday': ['12:00', '13:00'],
                    'thursday': ['12:00', '13:00'],
                    'friday': ['12:00', '13:00'],
                    'saturday': ['12:00', '13:00'],
                    'sunday': ['12:00', '13:00']
                },
                monthlySchedule: null,
                note: 'Available everyday at 12 PM and 1 PM'
            }
        },
        {
            _id: 'doc3',
            name: 'Dr. Gaurav Chhetri',
            image: doc3,
            speciality: 'सुगर प्रेसर तथा किड्नी विशेषज्ञ',
            degree: 'DM(NAMS,Bir Hospital) , MD (KU) consultant , DM (Nephrologist)',
            experience: '15+ Years',
            about: 'डा. गौरव क्षेत्री, MD (KU), DM (NAMS, Bir Hospital), DM (Nephrologist) - वरिष्ठ सुगर, प्रेसर तथा किड्नी विशेषज्ञ जसले consultant Nephrologist को रूपमा रहेर मधुमेह, उच्च रक्तचाप र मिर्गौला सम्बन्धी जटिल रोगहरूको निदान र उपचारमा विशिष्ट योगदान पुर्‍याउँदै आउनुभएको छ।किड्निमा समस्या भएका बिरामीहरूको स्वास्थ्य सुधारमा समर्पित रहेर विगत लामो समय देखि सेवा दिदै आईरहनु भएको झापा सुरूङ्गामा प्रत्येक महिनाको दोस्रो र चौथो शनिबार सेवा रहनेछ',
            specialties: [
                'मधुमेह निदान र उपचार',
                'उच्च रक्तचाप व्यवस्थापन',
                'मिर्गौला रोग उपचार',
                'Nephrology परामर्श',
                'किड्नी डायलिसिस',
                'जटिल किड्नी रोग'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [2, -1], // 2nd and last week
                    day: 'saturday',
                    times: ['11:00']
                },
                note: 'Available 2nd and last Saturday of every month at 11 AM'
            }
        },
        {
            _id: 'doc4',
            name: 'Dr. Pramod Kumar Shah',
            image: doc4,
            speciality: 'वरिष्ठ कन्सल्टेन्ट फिजिसियन',
            degree: 'MBBS , MD (INTERNAL MEDICINE) , Consultant physician',
            experience: '15+ Years',
            about: 'डा. प्रमोद कुमार शाह, MBBS, MD (INTERNAL MEDICINE)वरिष्ठ फिजिसियन लामो अनुभव र उत्कृष्ट शैक्षिक पृष्ठभूमि भएका डा. शाह आधुनिक चिकित्सा पद्धति र परम्परागत ज्ञानको समन्वय गरी बिरामीहरूको व्यापक उपचार गर्नुहुन्छ। उहाँले प्रत्येक बिरामीको व्यक्तिगत आवश्यकता अनुसार सेवा प्रदान गर्दै आफ्नो पेशागत दक्षता र मानवीय संवेदनशीलताको परिचय दिनुहुन्छ। उहाँको समर्पित सेवा र विशेष चिकित्सकीय कौशलले बिरामीहरूको स्वास्थ्यमा उल्लेखनीय सुधार ल्याउनुभएको छ।',
            specialties: [
                'सामान्य चिकित्सा परामर्श',
                'रोग निदान र उपचार',
                'रोकथाम चिकित्सा',
                'स्वास्थ्य शिक्षा',
                'आन्तरिक चिकित्सा',
                'व्यापक स्वास्थ्य जाँच'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'monday': ['15:00'],
                    'tuesday': ['15:00'],
                    'wednesday': ['15:00'],
                    'thursday': ['15:00'],
                    'friday': ['15:00'],
                    'saturday': ['15:00'],
                    'sunday': ['15:00']
                },
                monthlySchedule: null,
                note: 'Available everyday at 3 PM'
            }
        },
        {
            _id: 'doc5',
            name: 'Dr. Pravakar Shah',
            image: doc5,
            speciality: 'जनरल तथा त्याप्रोस्कोपिक सर्जन र पायल्स रोग विशेषज्ञ',
            degree: 'MBBS (KUMS) , General & Laparoscopic Surgeon',
            experience: '12+ Years',
            about: 'डा. प्रभाकर शाह, MBBS (KUMS) - अत्याधुनिक ल्याप्रोस्कोपिक प्रविधि माफर्त जटिल शल्यक्रियाहरू गर्ने वरिष्ठ शल्यचिकित्सक हुनुहुन्छ, विशेषगरी पाइल्स, फिस्टुला र पेटका समस्याहरूको न्यूनतम चिरफार विधिद्वारा कुशल उपचार प्रदान गर्दै बिरामीहरूलाई छिटो स्वास्थ्य लाभ र कम दुखाइको सुनिश्चितता दिनुहुन्छ।',
            specialties: [
                'ल्याप्रोस्कोपिक सर्जरी',
                'पाइल्स उपचार',
                'फिस्टुला सर्जरी',
                'पेटका समस्या',
                'न्यूनतम चिरफार सर्जरी',
                'सामान्य शल्यक्रिया'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [2], // 2nd week
                    day: 'sunday',
                    times: ['07:00']
                },
                note: 'Available 2nd Sunday of every month at 7 AM'
            }
        },
        {
            _id: 'doc6',
            name: 'Dr. Ram Krishna Giri',
            image: doc6,
            speciality: 'वाथ तथा प्रतिरक्षा रोग विशेषज्ञ',
            degree: 'MBBS , MD , FCIR',
            experience: '14+ Years',
            about: 'डा. रामकृष्ण गिरि, MBBS, MD, FCIR - जोर्नी सुजन, गठिया, लुपस र अन्य प्रतिरक्षा प्रणाली सम्बन्धी रोगहरूको पहिचान र व्यवस्थापनमा अग्रणी वरिष्ठ विशेषज्ञ हुनुहुन्छ, जसले आधुनिक बायोलोजिकल थेरापी र इम्युनोमोड्युलेटर उपचार विधिहरू प्रयोग गरी दीर्घकालीन बाथ रोगका बिरामीहरूको जीवनस्तरमा उल्लेखनीय सुधार ल्याउनुभएको छ।',
            specialties: [
                'जोर्नी सुजन उपचार',
                'गठिया र बाथ रोग',
                'लुपस उपचार',
                'प्रतिरक्षा रोग',
                'बायोलोजिकल थेरापी',
                'इम्युनोमोड्युलेटर उपचार'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [3], // 3rd week
                    day: 'sunday',
                    times: ['07:00']
                },
                note: 'Available 3rd Sunday of every month at 7 AM'
            }
        },
        {
            _id: 'doc7',
            name: 'Dr. Rabindra Simkhada',
            image: doc7,
            speciality: 'मुटृुरोग विशेषज्ञ',
            degree: 'MD (Internal Medicine),DM (cardiology)',
            experience: '20+ Years',
            about: 'डा. रविन्द्र सिम्खडा, MD (Internal Medicine), DM (Cardiology) - मानव शरीरको सबै भन्दा जटिल अंग मुटुको जटिल रोगहरूको निदान र उपचारमा विशिष्ट अनुभव राख्नुहुने हृदयरोग विशेषज्ञ डाक्टर रवीन्द्र सिम्खडा सहिद गङ्गालाल राष्ट्रिय हृदय रोग केन्द्र काठमान्डौमा कार्यरत हुनुहुन्छ।मुटुरोग विभागमा 20 + yrs वडी अनुभव प्राप्त मुटु विशेषज्ञ जसले ECG, इकोकार्डियोग्राफी र हृदय क्याथेटराइजेसन जस्ता उन्नत प्रविधिहरू प्रयोग गर्दै हृदय स्वास्थ्य सुधार र हृदयaघात रोकथाममा महत्त्वपूर्ण भूमिका निर्वाह गर्नुहुन्छ।',
            specialties: [
                'हृदयरोग निदान र उपचार',
                'ECG र इकोकार्डियोग्राफी',
                'हृदय क्याथेटराइजेसन',
                'हृदयाघात रोकथाम',
                'हृदय स्वास्थ्य परामर्श',
                'कार्डियोलोजी जाँच'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [1], // 1st week
                    day: 'friday',
                    times: ['13:00']
                },
                note: 'Available first Friday of every month at 1 PM'
            }
        },
        {
            _id: 'doc8',
            name: 'Dr. Sandeep Chand Shrestha',
            image: doc8,
            speciality: 'सुगर थाइराईड तथा हर्मोन विशेषज्ञ',
            degree: 'MBBS , MD ,Fellowship in Endocrinology and metabolish',
            experience: '20+ Years',
            about: 'डा. सन्दिप चन्द्र श्रेष्ठ, MBBS, MD, Fellowship in Endocrinology and Metabolism - अन्तःस्रावी ग्रन्थि प्रणालीका विकारहरूमा विशिष्ट दक्षता राख्नुहुने विशेषज्ञ हुनुहुन्छ, जसले मधुमेह नियन्त्रण, थाइराइड असन्तुलन र हर्मोनल समस्याहरूको समग्र व्यवस्थापनका लागि अत्याधुनिक उपचार विधिहरू र वैयक्तिकृत औषधि प्रणालीको माध्यमबाट रोगीहरूको चयापचय स्वास्थ्य सुधारमा उत्कृष्ट योगदान पुर्‍याउनुहुन्छ।',
            specialties: [
                'मधुमेह नियन्त्रण',
                'थाइराइड रोग उपचार',
                'हर्मोनल समस्या',
                'अन्तःस्रावी ग्रन्थि विकार',
                'चयापचय स्वास्थ्य',
                'एन्डोक्रिनोलोजी परामर्श'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [4], // 4th week
                    day: 'wednesday',
                    times: ['16:00']
                },
                note: 'Available 4th Wednesday of every month at 4 PM'
            }
        },
        {
            _id: 'doc9',
            name: 'Dr. Sashank Raj Pokhrel',
            image: doc9,
            speciality: 'मानसिक, नशा तथा टाउको रोग विशेषज्ञ',
            degree: 'MD(Psychiatric)',
            experience: '12+ Years',
            about: 'डा. सशांक राज पोखरेल, MD (Psychiatric) - मनोचिकित्सामा विशिष्ट दक्षता भएका वरिष्ठ मानसिक स्वास्थ्य विशेषज्ञ हुनुहुन्छ, जसले चिन्ता, अवसाद, द्विध्रुवी विकार र नशा दुरुपयोग जस्ता जटिल मानसिक अवस्थाहरूको साथै माइग्रेन र टाउकोका अन्य न्यूरोलोजिकल समस्याहरूको समग्र उपचारमा संज्ञानात्मक व्यवहार थेरापी र आधुनिक औषधि प्रोटोकलहरू एकीकृत गर्दै बिरामीहरूको जीवनस्तर उकास्न महत्त्वपूर्ण भूमिका निर्वाह गर्नुहुन्छ।',
            specialties: [
                'मानसिक स्वास्थ्य परामर्श',
                'चिन्ता र अवसाद उपचार',
                'नशा मुक्ति उपचार',
                'माइग्रेन र टाउको दुखाइ',
                'मनोचिकित्सा थेरापी',
                'न्यूरोलोजिकल समस्या'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {},
                monthlySchedule: {
                    weeks: [4], // 4th week
                    day: 'saturday',
                    times: ['10:00']
                },
                note: 'Available 4th Saturday of every month at 10 AM'
            }
        },
        {
            _id: 'doc10',
            name: 'Dr. Santosh Thapa',
            image: doc10,
            speciality: 'हाडजोर्नी नशा तथा मेरुदण्ड विशेषज्ञ',
            degree: 'MD(Orthopedic Surgeon Assistant Professor',
            experience: '20+ Years',
            about: 'डा. सन्तोष थापा, MD (Orthopedic Surgeon), Assistant Professor - हाडजोर्नी भाँचिएका, खेलकुद चोटपटक र मेरुदण्ड सम्बन्धी समस्याहरूको विशेषज्ञ चिकित्सक हुनुहुन्छ, जसले न्यूरोसर्जिकल प्रविधिहरू र मिनिमल इन्भेसिभ स्पाइनल प्रक्रियाहरू प्रयोग गरी डिस्क हर्निएशन, स्पाइनल स्टेनोसिस र जीर्ण दुखाइका बिरामीहरूलाई अत्याधुनिक उपचार प्रदान गर्दै शिक्षण र अनुसन्धान कार्यमा समेत सक्रिय रूपमा संलग्न हुनुहुन्छ।',
            specialties: [
                'हाडजोर्नी भाँचिएको उपचार',
                'खेलकुद चोटपटक',
                'मेरुदण्ड सर्जरी',
                'डिस्क हर्निएशन',
                'स्पाइनल स्टेनोसिस',
                'अर्थोपेडिक सर्जरी'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'saturday': ['13:00']
                },
                monthlySchedule: null,
                note: 'Available every Saturday at 1 PM'
            }
        },
        // New doctors added below
        {
            _id: 'doc11',
            name: 'Dr. Sambhu Nawal',
            image: maledoctoravatar,
            speciality: 'जनरल तथा त्याप्रोस्कोपिक सर्जन र पायल्स रोग विशेषज्ञ',
            degree: 'MBBS, MS (General Surgery)',
            experience: '10+ Years',
            about: 'डा. सम्भु नवल - अत्याधुनिक ल्याप्रोस्कोपिक प्रविधि माफर्त जटिल शल्यक्रियाहरू गर्ने वरिष्ठ शल्यचिकित्सक हुनुहुन्छ, विशेषगरी पाइल्स, फिस्टुला र पेटका समस्याहरूको न्यूनतम चिरफार विधिद्वारा कुशल उपचार प्रदान गर्नुहुन्छ।',
            specialties: [
                'ल्याप्रोस्कोपिक सर्जरी',
                'पाइल्स उपचार',
                'फिस्टुला सर्जरी',
                'पेटका समस्या',
                'न्यूनतम चिरफार सर्जरी',
                'सामान्य शल्यक्रिया'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'saturday': ['13:00']
                },
                monthlySchedule: null,
                note: 'Available every Saturday at 1 PM'
            }
        },
        {
            _id: 'doc12',
            name: 'Dr. Niraj Rauniyar',
            image: maledoctoravatar,
            speciality: 'ENT विशेषज्ञ',
            degree: 'MBBS, MS (ENT)',
            experience: '10+ Years',
            about: 'डा. निरज राउनियार - कान, नाक र घाँटी रोग विशेषज्ञ जसले ENT सम्बन्धी विभिन्न समस्याहरूको निदान र उपचारमा विशेष दक्षता राख्नुहुन्छ।',
            specialties: [
                'कान रोग उपचार',
                'नाक र साइनस समस्या',
                'घाँटी रोग',
                'श्रवण समस्या',
                'ENT सर्जरी',
                'एलर्जी उपचार'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'saturday': ['01:00']
                },
                monthlySchedule: null,
                note: 'Available every Saturday at 1 AM'
            }
        },
        {
            _id: 'doc13',
            name: 'Dr. Sandhya Shah',
            image: femaledoctoravatar,
            speciality: 'प्रसूति तथा प्रजनन् विशेषज्ञ',
            degree: 'MBBS, MD (OBS/GYN)',
            experience: '12+ Years',
            about: 'डा. सन्ध्या शाह - आदरणीय प्रसूति तथा प्रजनन् विशेषज्ञ हुनुहुन्छ जसले महिलाहरूको प्रजनन् स्वास्थ्य, गर्भावस्था व्यवस्थापन र स्त्री रोग उपचारमा उत्कृष्ट सेवा प्रदान गर्नुहुन्छ।',
            specialties: [
                'गर्भावस्था व्यवस्थापन',
                'प्रसूति सेवा',
                'स्त्री रोग परामर्श',
                'महिला प्रजनन् स्वास्थ्य',
                'गर्भावस्था जटिलता',
                'फ्यामिली प्लानिङ'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'saturday': ['18:00']
                },
                monthlySchedule: null,
                note: 'Available every Saturday at 6 PM'
            }
        },
        {
            _id: 'doc14',
            name: 'Dr. Ashreya Kadariya',
            image: femaledoctoravatar,
            speciality: 'बाल रोग विशेषज्ञ',
            degree: 'MBBS, MD (Pediatrics)',
            experience: '10+ Years',
            about: 'डा. आश्रेया कडरिया - बाल रोग विशेषज्ञ जसले बालबालिकाको स्वास्थ्य र विकासमा विशेष ध्यान दिनुहुन्छ।',
            specialties: [
                'बाल रोग निदान',
                'खोप र इम्युनाइजेसन',
                'बाल विकास मूल्यांकन',
                'नवजात शिशु हेरचाह',
                'बाल पोषण परामर्श',
                'बाल संक्रमण उपचार'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'monday': ['17:00'],
                    'tuesday': ['17:00'],
                    'wednesday': ['17:00'],
                    'thursday': ['17:00'],
                    'friday': ['17:00'],
                    'saturday': ['17:00'],
                    'sunday': ['17:00']
                },
                monthlySchedule: null,
                note: 'Available everyday at 5 PM'
            }
        },
        {
            _id: 'doc15',
            name: 'Dr. Sanjeev K. Shah',
            image: maledoctoravatar,
            speciality: 'बाल रोग विशेषज्ञ',
            degree: 'MBBS, MD (Pediatrics)',
            experience: '12+ Years',
            about: 'डा. संजीव के. शाह - बाल रोग विशेषज्ञ जसले बालबालिकाको स्वास्थ्य समस्याहरूको निदान र उपचारमा विशेष दक्षता राख्नुहुन्छ।',
            specialties: [
                'बाल रोग निदान',
                'खोप र इम्युनाइजेसन',
                'बाल विकास मूल्यांकन',
                'नवजात शिशु हेरचाह',
                'बाल पोषण परामर्श',
                'बाल संक्रमण उपचार'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'monday': ['17:00'],
                    'tuesday': ['17:00'],
                    'wednesday': ['17:00'],
                    'thursday': ['17:00'],
                    'friday': ['17:00'],
                    'saturday': ['17:00'],
                    'sunday': ['17:00']
                },
                monthlySchedule: null,
                note: 'Available everyday at 5 PM'
            }
        },
        {
            _id: 'doc16',
            name: 'Dr. Prabin Chaudhary',
            image: maledoctoravatar,
            speciality: 'हाडजोर्नी नशा तथा मेरुदण्ड विशेषज्ञ',
            degree: 'MBBS, MS (Orthopedics)',
            experience: '12+ Years',
            about: 'डा. प्रविन चौधरी - हाडजोर्नी र मेरुदण्ड सम्बन्धी समस्याहरूको विशेषज्ञ चिकित्सक हुनुहुन्छ जसले हाड भाँचिएको, जोर्नी समस्या र खेलकुद चोटपटकको उपचार गर्नुहुन्छ।',
            specialties: [
                'हाडजोर्नी भाँचिएको उपचार',
                'खेलकुद चोटपटक',
                'जोर्नी प्रतिस्थापन',
                'मेरुदण्ड समस्या',
                'अर्थोपेडिक सर्जरी',
                'हड्डी रोग उपचार'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'monday': ['13:00'],
                    'tuesday': ['13:00'],
                    'wednesday': ['13:00'],
                    'thursday': ['13:00'],
                    'friday': ['13:00'],
                    'saturday': ['13:00'],
                    'sunday': ['13:00']
                },
                monthlySchedule: null,
                note: 'Available everyday at 1 PM'
            }
        },
        {
            _id: 'doc17',
            name: 'Dr. Sonu Bharati',
            image: femaledoctoravatar,
            speciality: 'प्रसूति तथा प्रजनन् विशेषज्ञ',
            degree: 'MBBS, MD (OBS/GYN)',
            experience: '10+ Years',
            about: 'डा. सोनू भारती - प्रसूति तथा प्रजनन् विशेषज्ञ हुनुहुन्छ जसले महिलाहरूको प्रजनन् स्वास्थ्य र गर्भावस्था व्यवस्थापनमा विशेष दक्षता राख्नुहुन्छ।',
            specialties: [
                'गर्भावस्था व्यवस्थापन',
                'प्रसूति सेवा',
                'स्त्री रोग परामर्श',
                'महिला प्रजनन् स्वास्थ्य',
                'बाँझोपन उपचार',
                'फ्यामिली प्लानिङ'
            ],
            address: {
                line1: 'Surunga Medicine and Clinic',
                line2: 'Kankai-03, Surunga, Jhapa'
            },
            availability: {
                days: {
                    'thursday': ['08:00'],
                    'saturday': ['12:30']
                },
                monthlySchedule: null,
                note: 'Available Thursday at 8 AM and Saturday at 12:30 PM'
            }
        }
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
            maledoctoravatar;
        
        // Create the new doctor object with default availability if not provided
        const newDoctor = {
            _id: newId,
            ...newDoctorData,
            image: doctorImage,
            availability: newDoctorData.availability || {
                days: {
                    'monday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
                    'tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
                    'wednesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
                    'thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
                    'friday': ['09:00', '10:00', '11:00', '14:00', '15:00']
                },
                monthlySchedule: null,
                note: 'Available Monday to Friday'
            }
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
    
    // Function to update doctor availability with helper methods
    const updateDoctorAvailability = (doctorId, newAvailability) => {
        return updateDoctor(doctorId, { availability: newAvailability });
    };

    // Helper function to add available dates to a doctor
    const addAvailableDates = (doctorId, newDates) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor) return false;

        const updatedAvailability = {
            ...doctor.availability,
            availableDates: doctor.availability.availableDates 
                ? [...doctor.availability.availableDates, ...newDates]
                : newDates
        };
        return updateDoctorAvailability(doctorId, updatedAvailability);
    };

    // Helper function to remove available dates from a doctor
    const removeAvailableDates = (doctorId, datesToRemove) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability.availableDates) return false;

        const updatedAvailability = {
            ...doctor.availability,
            availableDates: doctor.availability.availableDates.filter(
                date => !datesToRemove.includes(date)
            )
        };
        return updateDoctorAvailability(doctorId, updatedAvailability);
    };

    // Helper function to set vacation period (remove dates in range)
    const setVacationPeriod = (doctorId, startDate, endDate) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability.availableDates) return false;

        const filteredDates = doctor.availability.availableDates.filter(dateStr => {
            return dateStr < startDate || dateStr > endDate;
        });

        const updatedAvailability = {
            ...doctor.availability,
            availableDates: filteredDates
        };
        return updateDoctorAvailability(doctorId, updatedAvailability);
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

    // Helper function to get day name from date
    const getDayName = (date) => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[date.getDay()];
    };

    // Helper function to normalize date to YYYY-MM-DD format (timezone safe)
    const normalizeDate = (date) => {
        if (typeof date === 'string') {
            // If it's already a string, ensure it's in YYYY-MM-DD format
            return date.split('T')[0];
        }
        if (date instanceof Date) {
            // Use local timezone methods instead of UTC to avoid "+1 day" issue
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return null;
    };

    // Helper function to get which week of the month a date falls in
    const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const dayOfMonth = date.getDate();
        return Math.ceil((dayOfMonth + firstDay.getDay()) / 7);
    };

    // Helper function to check if date is last week of month
    const isLastWeekOfMonth = (date) => {
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const lastWeek = getWeekOfMonth(lastDayOfMonth);
        return getWeekOfMonth(date) === lastWeek;
    };

    // Check if doctor is available on a specific date and time
    const isDoctorAvailable = (doctorId, date, time) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability) return false;

        const dayName = getDayName(date);
        const dateString = normalizeDate(date);
        
        if (!dateString) return false;

        // Check blocked dates first
        const isBlocked = doctor.availability.blockedDates && 
                         doctor.availability.blockedDates.includes(dateString);
        if (isBlocked) return false;

        // Check if there's a monthly schedule pattern
        if (doctor.availability.monthlySchedule) {
            const schedule = doctor.availability.monthlySchedule;
            const weekOfMonth = getWeekOfMonth(date);
            
            // Check if the day matches
            if (schedule.day !== dayName) return false;
            
            // Check if the week matches
            let weekMatches = false;
            for (const week of schedule.weeks) {
                if (week === -1 && isLastWeekOfMonth(date)) {
                    weekMatches = true;
                    break;
                } else if (week === weekOfMonth) {
                    weekMatches = true;
                    break;
                }
            }
            
            if (!weekMatches) return false;
            
            // Check if time is available
            return schedule.times.includes(time);
        }

        // Check regular weekly schedule
        const hasDaySchedule = doctor.availability.days && 
                              doctor.availability.days[dayName] && 
                              doctor.availability.days[dayName].length > 0;
        
        if (hasDaySchedule) {
            return doctor.availability.days[dayName].includes(time);
        }

        return false;
    };

    // Get available time slots for a doctor on a specific date
    const getDoctorAvailableSlots = (doctorId, date) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability) {
            console.log(` No doctor or availability for ID: ${doctorId}`);
            return [];
        }

        const dayName = getDayName(date);
        const dateString = normalizeDate(date);
        
        if (!dateString) {
            console.log(` Invalid date string for: ${date}`);
            return [];
        }

        // Check if date is blocked
        const isBlocked = doctor.availability.blockedDates && 
                         doctor.availability.blockedDates.includes(dateString);
        if (isBlocked) {
            console.log(` Date is blocked`);
            return [];
        }

        // Check if there's a monthly schedule pattern
        if (doctor.availability.monthlySchedule) {
            const schedule = doctor.availability.monthlySchedule;
            const weekOfMonth = getWeekOfMonth(date);
            
            // Check if the day matches
            if (schedule.day !== dayName) return [];
            
            // Check if the week matches
            let weekMatches = false;
            for (const week of schedule.weeks) {
                if (week === -1 && isLastWeekOfMonth(date)) {
                    weekMatches = true;
                    break;
                } else if (week === weekOfMonth) {
                    weekMatches = true;
                    break;
                }
            }
            
            if (!weekMatches) return [];
            
            // Return the time slots for this schedule
            return schedule.times;
        }

        // Check regular weekly schedule
        const hasDaySchedule = doctor.availability.days && 
                              doctor.availability.days[dayName] && 
                              doctor.availability.days[dayName].length > 0;
        
        if (hasDaySchedule) {
            return doctor.availability.days[dayName];
        }

        return [];
    };

    // Check if doctor is available on a specific date
    const isDoctorAvailableOnDate = (doctorId, date) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability) {
            return false;
        }

        const dayName = getDayName(date);
        const dateString = normalizeDate(date);
        
        if (!dateString) {
            return false;
        }

        // Check if date is blocked
        const isBlocked = doctor.availability.blockedDates && 
                         doctor.availability.blockedDates.includes(dateString);
        if (isBlocked) {
            return false;
        }

        // Check if there's a monthly schedule pattern
        if (doctor.availability.monthlySchedule) {
            const schedule = doctor.availability.monthlySchedule;
            const weekOfMonth = getWeekOfMonth(date);
            
            // Check if the day matches
            if (schedule.day !== dayName) return false;
            
            // Check if the week matches
            for (const week of schedule.weeks) {
                if (week === -1 && isLastWeekOfMonth(date)) {
                    return true;
                } else if (week === weekOfMonth) {
                    return true;
                }
            }
            
            return false;
        }

        // Check regular weekly schedule
        const hasDaySchedule = doctor.availability.days && 
                              doctor.availability.days[dayName] && 
                              doctor.availability.days[dayName].length > 0;
        
        return hasDaySchedule;
    };

    // Function to get next available date for a doctor
    const getNextAvailableDate = (doctorId) => {
        const doctor = getDoctorById(doctorId);
        if (!doctor || !doctor.availability) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const maxDaysToCheck = 60; // Check up to 2 months ahead
        
        for (let i = 0; i < maxDaysToCheck; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() + i);
            
            if (isDoctorAvailableOnDate(doctorId, checkDate)) {
                return checkDate;
            }
        }
        
        return null; // No availability found
    };

    return (
        <AppContext.Provider value={{ 
            doctors, 
            specialityData,
            addDoctor,
            updateDoctor,
            updateDoctorAvailability,
            addAvailableDates,
            removeAvailableDates,
            setVacationPeriod,
            deleteDoctor,
            getDoctorById,
            isDoctorAvailable,
            getDoctorAvailableSlots,
            isDoctorAvailableOnDate,
            getNextAvailableDate
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;