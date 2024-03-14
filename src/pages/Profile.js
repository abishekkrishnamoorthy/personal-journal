import React, { useEffect, useState } from 'react';
import Header from '../modules/dash/Header';
import { Avatar, Box, Container } from '@mui/material';
import '../style/profile.css';
import Post from '../modules/dash/Post';
import { Link } from 'react-router-dom';

const Profile = ({ cudetails, post , setcudetails}) => {
  const [collabRequests, setCollabRequests] = useState([]);
  useEffect(() => {
    const fetchCollabRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3500/collab/${cudetails._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch collaboration requests');
        }
        const data = await response.json();
        setCollabRequests(data);
      } catch (error) {
        console.error('Error fetching collaboration requests:', error);
      }
    };
    fetchCollabRequests();
  }, [cudetails._id]);


  const handleResponse = async (collabId, status) => {
    try {
      const response = await fetch('http://localhost:3500/collab/response', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collabId,
          status,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to respond to collaboration request');
      }
      // Update the UI or state as needed
      // For example, remove the collab request from the list
      const userResponse = await fetch(`http://localhost:3500/users/data/${cudetails.username}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem('cudetails', JSON.stringify(userData));
          setcudetails(userData)
        } else {
          throw new Error('Failed to fetch user details');
        }
      setCollabRequests(collabRequests.filter(request => request._id !== collabId));
    } catch (error) {
      console.error('Error responding to collaboration request:', error);
    }
  };

  return (
    <div className='dash'>
      <Header cudetails={cudetails} />
      <div className="profilecon">
        <Container sx={{ width: '50%' }}>
          <Box sx={{
            display: 'flex', flexDirection: 'column', bgcolor: '#a7a39b35', height: '40vh',
            marginTop: '20px', marginLeft: '20%', width: '70%', alignItems: 'center', borderRadius: '20px'
          }} >
            <Avatar
              sx={{
                width: '50%',
                height: '20vh',
                alignSelf: 'center',
                marginTop: '30px',
              }}></Avatar>
            <Link
              to='/uploadprofile'
              style={{
                textDecoration: 'none', padding: '2px', backgroundColor: '#5f9f84',
                width: '20%', marginTop: '5px', textAlign: 'center', borderRadius: '20px',
                color: 'white'
              }}> EDIT</Link>
            <h3 style={{ color: '#463804', marginBottom: '2px' }}>{cudetails.username}</h3>
            <h4 style={{ marginTop: '0', opacity: '0.5' }}>Dailyecho user</h4>
          </Box>
          <Box sx={{
            width: '70%', height: '40vh', backgroundColor: '#a7a39b35', marginTop: '20px',
            borderRadius: '20px', marginLeft: '20%', overflowY: 'scroll'
          }}>
            <h1 style={{ backgroundColor: '#5f9f84', textAlign: "center", padding: '10px', marginTop: '0' }}>Collab Requests</h1>
            {collabRequests.map(request => (
              <Box key={request._id} sx={{ width: '100%', height: '5vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '2px solid black' }}>
                <h2 style={{ textAlign: 'center', alignSelf: 'center', marginBottom: '25px', marginLeft: '10px' }}>{request?.senderId?.username}</h2>
                <div>
                <button onClick={() => handleResponse(request._id, 'accepted')}>Accept</button>
                  <button onClick={() => handleResponse(request._id, 'rejected')}>Reject</button>
                </div>
              </Box>
            ))}
          </Box>
        </Container>
        <Container sx={{ width: '100%' }}>
          <Box sx={{
            width: '100%', height: '83vh', backgroundColor: '#a7a39b35', marginTop: '20px',
            borderRadius: '20px', overflowY: 'scroll', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'
          }}>
            {post.map(post => <Post key={post.id} post={post} />)}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
