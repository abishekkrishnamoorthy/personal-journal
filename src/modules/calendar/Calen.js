// Calender.js
import React, { useState } from 'react';
import EventList from './EventList'; // Import the EventList component
import '../../style/calendar.css';

const Calender = () => {
  const [currentDate] = useState(new Date());
  const [events] = useState([
    { date: 7, title: 'Event 1', description: 'Description for Event 1' },
    { date: 15, title: 'Event 2', description: 'Description for Event 2' },
    // Add more events as needed
  ]);

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

      // Filter events for the current date
      const eventsForDate = events.filter(event => event.date === i);

      calendarDays.push(
        <div key={i} className={`calendar-day${isCurrentDate ? ' current-date' : ''}`}>
          {i}
          {/* Pass eventsForDate to EventList component */}
          {isCurrentDate && <EventList events={eventsForDate} />}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <p>{new Date(currentDate).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
      </div>
      <div className="calendar-days">{renderCalendar()}</div>
    </div>
  );
};

export default Calender;
