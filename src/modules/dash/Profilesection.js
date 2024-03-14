import React from 'react'
import pro from'./girl.jpg'
const Profilesection = ({user}) => {
  return (
    <div className="profile-header">
      <img
        src={pro} // Replace with the actual path to your profile image
        alt="Profile"
        className="profile-image"
      />
      <div className="profile-info">
        <h3>{user.username}</h3> {/* Replace with the actual name */}
        <p>User</p> {/* Replace with the actual job title or role */}
      </div>
      
    </div>
  )
}

export default Profilesection