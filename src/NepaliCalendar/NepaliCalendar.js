// Complete Fixed NepaliCalendar.js supporting the corrected date precedence logic
import React, { useState } from 'react';
import './NepaliCalendar.css';

const NepaliCalendar = ({ selectedDate, onDateSelect, isDateDisabled }) => {
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
      
      // Create a clean date for comparison (no time components)
      const cleanCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const cleanToday = new Date();
      cleanToday.setHours(0, 0, 0, 0);
      
      const isPast = cleanCurrentDate < cleanToday;
      
      // CORRECTED: Check if date is disabled using the improved logic
      // This now respects the date precedence system
      const isDisabled = isPast || (isDateDisabled && isDateDisabled(cleanCurrentDate));
      
      // Determine if date is available (not disabled, not past, is current month)
      const isAvailable = !isDisabled && !isPast && isCurrentMonth && !isToday && !isSelected;
      
      days.push({
        date: new Date(currentDate),
        englishDay: currentDate.getDate(),
        nepaliDay: nepaliDate.nepaliDay,
        nepaliDate: nepaliDate,
        isCurrentMonth,
        isToday,
        isSelected,
        isPast,
        isDisabled,
        isAvailable
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

  // Get comprehensive month display - handle both English and Nepali dual months
  const getCurrentNepaliMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const midDay = new Date(currentYear, currentMonth, 15);
    
    const nepaliFirst = convertToNepali(firstDay);
    const nepaliLast = convertToNepali(lastDay);
    const nepaliMid = convertToNepali(midDay);
    
    // Check if the English month spans two Nepali months
    const spansNepaliMonths = nepaliFirst.monthIndex !== nepaliLast.monthIndex;
    
    if (spansNepaliMonths) {
      return {
        ...nepaliMid,
        isDualMonth: true,
        type: 'englishSpansNepali',
        displayText: nepaliFirst.year === nepaliLast.year 
          ? `${nepaliFirst.month} / ${nepaliLast.month} ${nepaliFirst.nepaliYear}`
          : `${nepaliFirst.month} ${nepaliFirst.nepaliYear} / ${nepaliLast.month} ${nepaliLast.nepaliYear}`,
        englishMonth: englishMonths[currentMonth],
        englishYear: currentYear.toString()
      };
    }
    
    // Default single month display
    return {
      ...nepaliMid,
      isDualMonth: false,
      displayText: `${nepaliMid.month} ${nepaliMid.nepaliYear}`,
      englishMonth: englishMonths[currentMonth],
      englishYear: currentYear.toString()
    };
  };

  const calendarDays = getCalendarDays();
  const nepaliMonthInfo = getCurrentNepaliMonth();

  // Get special day info - Saturday as main weekend
  const getSpecialDayInfo = (date) => {
    const day = date.getDay();
    if (day === 6) return { type: 'saturday', name: 'शनिबार' }; // Saturday is main weekend
    return null;
  };

  // CORRECTED: Handle date click with proper validation
  const handleDateClick = (day) => {
    console.log(`📅 Calendar date clicked:`, {
      date: day.date.toISOString().split('T')[0],
      isCurrentMonth: day.isCurrentMonth,
      isDisabled: day.isDisabled,
      isPast: day.isPast,
      isAvailable: day.isAvailable
    });

    // Don't allow clicking on disabled dates or dates from other months
    if (day.isDisabled || !day.isCurrentMonth) {
      console.log(`📅 Click rejected: disabled or not current month`);
      return;
    }
    
    // Allow clicking on past dates that are today (for same-day appointments)
    if (day.isPast && !day.isToday) {
      console.log(`📅 Click rejected: past date (not today)`);
      return;
    }

    console.log(`📅 Date selection accepted, calling onDateSelect`);
    if (onDateSelect) {
      onDateSelect(day.date, day.nepaliDate);
    }
  };

  // Get available dates count for current month
  const getAvailableDatesCount = () => {
    return calendarDays.filter(day => day.isAvailable && day.isCurrentMonth).length;
  };

  // Get today's date count (should be 0 or 1)
  const getTodayCount = () => {
    return calendarDays.filter(day => day.isToday && day.isCurrentMonth && !day.isDisabled).length;
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
              {nepaliMonthInfo.displayText}
            </div>
            <div className="english-month-name">
              {englishMonths[currentMonth]} {currentYear}
            </div>
            {nepaliMonthInfo.subText && (
              <div className="nepali-sub-text">
                {nepaliMonthInfo.subText}
              </div>
            )}
            <div className="availability-summary">
              {getAvailableDatesCount() > 0 && (
                <span className="available-count">
                  {getAvailableDatesCount()} available dates
                </span>
              )}
              {getTodayCount() > 0 && (
                <span className="today-count">
                  Today {getTodayCount() > 0 ? 'available' : ''}
                </span>
              )}
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
            const canClick = day.isCurrentMonth && !day.isDisabled && (day.isToday || !day.isPast);
            
            return (
              <div
                key={index}
                className={`date-cell 
                           ${!day.isCurrentMonth ? 'other-month' : ''} 
                           ${day.isToday ? 'today' : ''} 
                           ${day.isSelected ? 'selected' : ''}
                           ${day.isDisabled ? 'disabled-date' : ''}
                           ${day.isPast && !day.isToday ? 'past-date' : ''}
                           ${day.isAvailable ? 'available-date' : ''}
                           ${canClick ? 'clickable' : ''}
                           ${specialDay && !day.isDisabled && !day.isAvailable ? specialDay.type : ''}`}
                onClick={() => handleDateClick(day)}
                style={{ cursor: canClick ? 'pointer' : 'not-allowed' }}
              >
                <div className="date-content">
                  <div className="english-date">{day.englishDay}</div>
                  <div className="nepali-date">{day.nepaliDay}</div>
                  
                  {/* Show indicators based on status */}
                  {day.isToday && day.isCurrentMonth && (
                    <div className="today-indicator">आज</div>
                  )}
                  
                  {specialDay && day.isCurrentMonth && !day.isDisabled && !day.isAvailable && !day.isToday && (
                    <div className="special-day-dot"></div>
                  )}
                  
                  {day.isAvailable && (
                    <div className="available-indicator">✓</div>
                  )}
                  
                  {day.isDisabled && day.isCurrentMonth && !day.isPast && (
                    <div className="unavailable-indicator">✕</div>
                  )}
                  
                  {day.isSelected && (
                    <div className="selected-indicator">●</div>
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
            <div className="legend-dot available-dot"></div>
            <span>उपलब्ध (Available)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot unavailable-dot"></div>
            <span>अनुपलब्ध (Unavailable)</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot weekend-dot"></div>
            <span>शनिबार (Saturday)</span>
          </div>
        </div>
        <div className="calendar-instructions">
          <small>💡 Click on available dates to select them. Past dates and unavailable dates are disabled.</small>
        </div>
      </div>
    </div>
  );
};

export default NepaliCalendar;