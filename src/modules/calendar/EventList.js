// EventList.js
import React from 'react';
import '../../style/calendar.css'
const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h3>Events for this date:</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong>: {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
