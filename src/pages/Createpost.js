import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// Import the CSS file
import '../style/Createpost.css'
import { useNavigate } from 'react-router-dom';
const tags = [
  'Happy', 'Sad', 'Angry', 'Excited',
  'Anxious', 'Grateful', 'Frustrated',
  'Hopeful', 'Lonely', 'Peaceful',
  'Stressed', 'Confident'
];

const CreatePost = ({cudetails}) => {
  const [formData, setFormData] = useState({
    user: cudetails._id,
    title: '',
    content: '',
    image: '',
    tags: []
  });
  const navigate=useNavigate()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagChange = (event) => {
    setFormData({
      ...formData,
      tags: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found');
        return;
      }
  
      // Create FormData object to send multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('user', formData.user);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('image', dataURItoBlob(formData.image), 'image.jpg');
  
      const response = await fetch('http://localhost:3500/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formDataToSend
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create post: ${errorMessage}`);
      }
  
      const responseData = await response.json();
      console.log('Post created successfully:', responseData);
      navigate('/home')
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };
  
  // Function to convert Data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeString });
}

  return (
    <div className="createpost">
      <Container maxWidth="sm" className="container">
        <Paper className="paper">
          <Typography variant="h4" gutterBottom>Create New Post</Typography>
          {formData.image && (
            <img src={formData.image} alt="Preview" className="previewImage" />
          )}
          <input
            accept="image/*"
            className="input"
            id="contained-button-file"
            type="file"
            name='image'
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className="uploadButton"
              startIcon={<PhotoCameraIcon className="cameraIcon" />}
              style={{backgroundColor:'#4c9653'}}
            >
              Upload Photo
            </Button>
          </label>
        </Paper>
        <TextField
          label="Entry Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={7}
          margin="normal"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          style={{backgroundColor:'#4c965360', fontSize:'20px'}}
        />
        
        <FormControl variant="outlined" className="formControl">
          <InputLabel id="tags-label">Select Tags</InputLabel>
          <Select
            labelId="tags-label"
            id="tags"
            multiple
            name="tags"
            value={formData.tags}
            onChange={handleTagChange}
            label="Select Tags"
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={handleSubmit}
          style={{marginTop:'10px', backgroundColor:'#4c9653'}}
        >
          Post
        </Button>
      </Container>
    </div>
  );
};

export default CreatePost;
