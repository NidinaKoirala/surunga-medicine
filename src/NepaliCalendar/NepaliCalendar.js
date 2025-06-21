// NepaliCalendar.js
import React, { useState } from 'react';
import './NepaliCalendar.css';

const NepaliCalendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Nepali calendar data
  const nepaliMonths = [
    'बैशाख', 'जेठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन',
    'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'
  ];

  const englishMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDaysShort = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];

  // Convert English digits to Nepali digits
  const englishToNepaliDigits = (num) => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(digit => nepaliDigits[parseInt(digit)]).join('');
  };

  // Convert to Nepali date
  const convertToNepali = (englishDate) => {
    const baseAD = new Date(2025, 5, 6); // June 6, 2025 
    const baseBS = { year: 2082, month: 1, day: 23 }; // Jestha 23, 2082
    
    const nepaliMonthDays = {
      2081: [31, 31, 32, 31, 31, 30, 30, 29, 30, 29, 30, 31],
      2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
      2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
      2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
      2086: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
      2087: [31, 31, 32, 31, 31, 31, 30, 30, 30, 30, 30, 30]
    };
    
    const diffTime = englishDate.getTime() - baseAD.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let nepaliYear = baseBS.year;
    let nepaliMonth = baseBS.month;
    let nepaliDay = baseBS.day + diffDays;
    
    let monthDays = nepaliMonthDays[nepaliYear] || nepaliMonthDays[2082];
    
    while (nepaliDay > monthDays[nepaliMonth]) {
      nepaliDay -= monthDays[nepaliMonth];
      nepaliMonth++;
      
      if (nepaliMonth >= 12) {
        nepaliMonth = 0;
        nepaliYear++;
        monthDays = nepaliMonthDays[nepaliYear] || nepaliMonthDays[2082];
      }
    }
    
    while (nepaliDay <= 0) {
      nepaliMonth--;
      
      if (nepaliMonth < 0) {
        nepaliMonth = 11;
        nepaliYear--;
        monthDays = nepaliMonthDays[nepaliYear] || nepaliMonthDays[2082];
      }
      
      nepaliDay += monthDays[nepaliMonth];
    }
    
    return {
      year: nepaliYear,
      month: nepaliMonths[nepaliMonth],
      monthIndex: nepaliMonth,
      day: nepaliDay,
      nepaliDay: englishToNepaliDigits(nepaliDay),
      nepaliYear: englishToNepaliDigits(nepaliYear),
      formatted: `${englishToNepaliDigits(nepaliYear)} साल ${nepaliMonths[nepaliMonth]} ${englishToNepaliDigits(nepaliDay)} गते`
    };
  };

  // Get calendar days for current month
  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const nepaliDate = convertToNepali(currentDate);
      const isCurrentMonth = currentDate.getMonth() === currentMonth;
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();
      const isPast = currentDate < new Date().setHours(0, 0, 0, 0);
      
      days.push({
        date: new Date(currentDate),
        englishDay: currentDate.getDate(),
        nepaliDay: nepaliDate.nepaliDay,
        nepaliDate: nepaliDate,
        isCurrentMonth,
        isToday,
        isSelected,
        isPast
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Navigate months
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get Nepali month for current English month
  const getCurrentNepaliMonth = () => {
    const sampleDate = new Date(currentYear, currentMonth, 15);
    return convertToNepali(sampleDate);
  };

  const calendarDays = getCalendarDays();
  const nepaliMonthInfo = getCurrentNepaliMonth();

  // Get special day info - Saturday as main weekend
  const getSpecialDayInfo = (date) => {
    const day = date.getDay();
    if (day === 6) return { type: 'saturday', name: 'शनिबार' }; // Saturday is main weekend
    return null;
  };

  return (
    <div className="modern-nepali-calendar">
      <div className="calendar-header">
        <div className="month-navigation">
          <button type="button" onClick={goToPreviousMonth} className="nav-btn prev-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <div className="month-display">
            <div className="nepali-month-name">
              {nepaliMonthInfo.month} {nepaliMonthInfo.nepaliYear}
            </div>
            <div className="english-month-name">
              {englishMonths[currentMonth]} {currentYear}
            </div>
          </div>
          
          <button type="button" onClick={goToNextMonth} className="nav-btn next-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar-body">
        <div className="weekdays-header">
          {weekDaysShort.map((day, index) => (
            <div key={day} className={`weekday-cell ${index === 6 ? 'saturday' : ''}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-dates">
          {calendarDays.map((day, index) => {
            const specialDay = getSpecialDayInfo(day.date);
            return (
              <div
                key={index}
                className={`date-cell ${!day.isCurrentMonth ? 'other-month' : ''} 
                           ${day.isToday ? 'today' : ''} 
                           ${day.isSelected ? 'selected' : ''}
                           ${day.isPast ? 'past-date' : ''}
                           ${specialDay ? specialDay.type : ''}`}
                onClick={() => !day.isPast && day.isCurrentMonth && onDateSelect && onDateSelect(day.date, day.nepaliDate)}
              >
                <div className="date-content">
                  <div className="english-date">{day.englishDay}</div>
                  <div className="nepali-date">{day.nepaliDay}</div>
                  {specialDay && day.isCurrentMonth && (
                    <div className="special-day-dot"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-legend">
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-dot today-dot"></div>
            <span>आज (Today)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot selected-dot"></div>
            <span>छानिएको (Selected)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot weekend-dot"></div>
            <span>शनिबार (Saturday)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NepaliCalendar;