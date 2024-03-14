import React, { useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../../style/post.css';

const Post = ({ post }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(http://localhost:3500/uploads/${post.image.filename})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const [isLiked, setIsLiked] = useState(post.like);
  const handleLikeClick = async () => {
    try {
      // Toggle the isLiked state directly
      setIsLiked(prevIsLiked => !prevIsLiked);
      const accessToken = localStorage.getItem('accessToken');
      // Send a PATCH request to update the like status on the server
      const response = await fetch('http://localhost:3500/posts/like', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify({
          postId: post._id,
          like: !isLiked, // Toggle the like status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <Card className='post'>
      <CardActionArea>
        <div className='postimg' style={backgroundImageStyle}></div>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {post.title}
          </Typography>
          <div className='tag'>
            {post.tags.map((tag, index) => (
              <p key={index}>{tag.replace(/[\[\]"]+/g, '')}</p>
            ))}
          </div>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(post.postTime).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
