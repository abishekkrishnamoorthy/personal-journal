 import React, { useState } from 'react'
  import '../../style/dash.css'
 const Calender = () => {
    const [currentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isCurrentDate = date.toDateString() === currentDate.toDateString();
      calendarDays.push(
        <div key={i} className={`calendar-day${isCurrentDate ? ' current-date' : ''}`}>
          {i}
        </div>
      );
    }

    return calendarDays;
  };

    return (
    <div className="modern-calendar">
    <div className="calendar-header">
      <p>{new Date(currentDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
    </div>
    <div className="calendar-days">{renderCalendar()}</div>
  </div>
   )
 } 
 
 export default Calender




