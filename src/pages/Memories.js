import React, { useState } from 'react';
import Header from '../modules/dash/Header';
import '../style/dash.css';
import Post from '../modules/collab/Post';
import Footer from '../modules/dash/Footer';
import { Avatar, Box, Tooltip } from '@mui/material';
import '../style/post.css';

const Memories = ({ post, cudetails, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [friendpost,setfriendpost]=useState([])
  const [activeFriend, setActiveFriend] = useState(null)
  const friendsData = cudetails.friends.map(friendId => {
    return user.find(u => u._id === friendId);
  });
  const filteredUsers = user.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !cudetails.friends.includes(user._id) // Filter out friends of the current user
  );

  const handleRequest = async (requestedUserId) => {
    // Check if userid and requestedid are the same
    if (cudetails._id === requestedUserId) {
      // Show warning message
      console.log('Cannot send collaboration request to yourself');
      return;
    }

    try {
      // Send collaboration request
      const response = await fetch('http://localhost:3500/collab/request', {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: cudetails._id,
        receiverId: requestedUserId,
      }),
    });

      // Check if the request was successful
      if (response.status === 201) {
        // Update the requestedUsers state to disable the "Request" button
        setRequestedUsers([...requestedUsers, requestedUserId]);
        console.log('Collaboration request sent successfully');
      }
    } catch (error) {
      console.error('Error sending collaboration request:', error);
    }
  };

  const handleFriendButtonClick = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3500/posts/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setfriendpost(userData); 
      setActiveFriend(userId);// Assuming setPost is the setter function for post state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

 console.log(friendpost)


  return (
    <div className='dash'>
      <Header cudetails={cudetails} />
      <div className="dashcon">
        <Box sx={{
          width: "25%", height: '85vh',
          backgroundColor: 'transparent', marginTop: '12px', marginLeft: "5px"
        }}>
          <Box sx={{
            width: "100%", height: '40vh',
            backgroundColor: '#a7a39b35',
            overflowY:'scroll',
            overflowX:'hidden'
          }}>
            <input
              type="text"
              style={{
                width: '80%', marginLeft: '10%', marginRight: '10%',
                height: '4vh', border: 'none', textAlign: 'center',
                borderRadius: '20px', marginTop: "10px", color: 'black'
              }}
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredUsers.map(user => (
              <div key={user._id} >
                  <div className="userprofile">
                    <Avatar sx={{with:'40px',height:'40px'}}>D</Avatar> 
                  <div className="userdetials">
                     <h5>{user.username}</h5>
                     <h6>Dailyecho user</h6>
                  </div>
                  <div className="followbtn">
                  {requestedUsers.includes(user._id) ? (
                    <button disabled>Requested</button>
                  ) : (
                    <Tooltip title="User cannot send a collaboration request to themselves" open={showWarning} placement="top">
                      <button onClick={() => handleRequest(user._id)}>Request</button>
                    </Tooltip>
                  )}
                  </div>  
                  </div>
              </div>
            ))}
          </Box>
          <Box sx={{
            width: "100%", height: '45vh',
            backgroundColor: '#a7a39b35', marginTop: "5px", overflowY: 'scroll'
          }}>
            <h1 style={{ backgroundColor: '#5f9f84', textAlign: "center", padding: '10px', marginTop: '0' }}>Friends</h1>
            {friendsData?.map(user => (
              <button key={user?._id} style={{width:'100%', border:'1px solid green', cursor:'pointer', height:'8vh'
                                             , margintop:'0px', marginBottom:'5px', backgroundColor:(activeFriend === user?._id ? 'green' : 'transparent')}} className='frnbtn'
                                             onClick={() => handleFriendButtonClick(user?._id)}>
                  <div className="userprofile">
                    <Avatar sx={{with:'40px',height:'40px'}}>D</Avatar> 
                  <div className="userdetials">
                     <h5>{user?.username}</h5>
                     <h6>Dailyecho user</h6>
                  </div>
                  </div>
              </button>
            ))}         
          </Box>
        </Box>
        <div className='dashmain'>
        {friendpost && friendpost.length > 0 ? (
  friendpost.filter(post => post.like).map(post => <Post key={post.id} post={post} />)
) : (
  <h1>No posts found</h1>
)}

        </div>
      </div>
    </div>
  );
};

export default Memories;
