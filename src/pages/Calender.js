import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Header from '../modules/dash/Header';
import '../style/calendar.css'; // Import the custom styles
import { Paper } from '@mui/material';
import Post from '../modules/dash/Post';

const Calender = ({ cudetails, jpost }) => {
  // State to hold the selected date and the journal entries for that date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entriesForSelectedDate, setEntriesForSelectedDate] = useState([]);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Filter journal entries for the selected date
    const entries = jpost.filter(entry => {
      const entryDate = new Date(entry.postTime);
      return entryDate.toDateString() === date.toDateString();
    });
    setEntriesForSelectedDate(entries);
  }

  // Function to get a random post image for a specific date
  const getRandomPostImage = (date) => {
    const entriesForDate = jpost.filter(entry => {
      const entryDate = new Date(entry.postTime);
      return entryDate.toDateString() === date.toDateString();
    });
    if (entriesForDate.length > 0) {
      const randomEntry = entriesForDate[Math.floor(Math.random() * entriesForDate.length)];
      return `http://localhost:3500/uploads/${randomEntry.image.filename}`;
    } else {
      return null; // No posts for the date
    }
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const imageUrl = getRandomPostImage(date);
      const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: 'transparent', // Fallback color if the image is unavailable
        height: '8vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      };
      return (
        <div className="calendar-tile-content" style={backgroundStyle}></div>
      );
    }
    return null;
  };

  return (
    <div className='calendarpage'>
      <Header cudetails={cudetails}/>
      <Paper sx={{width:'98%', alignSelf:'center', marginTop:'20px', height:"85vh", display:'flex', flexDirection:'row'} } elevation={10}>
        <Paper sx={{width:'35%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} elevation={5}>
        <Calendar
          className="custom-calendar"
          value={selectedDate}
          onChange={handleDateChange}
          tileContent={tileContent}
          
        />
        </Paper >
        {/* Display journal entries for the selected date */}
        <Paper sx={{width:'64%',marginLeft:'1%', display:'flex', flexDirection:"row", flexWrap:"wrap", justifyContent:'space-between', overflowY:'auto', height:'85vh'}}>
          {entriesForSelectedDate.map(entry => 
             <Post key={entry.id} post={entry}/>
          )}
        </Paper>
        </Paper>
    </div>
  );
}

export default Calender;
