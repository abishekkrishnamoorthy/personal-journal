import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../modules/dash/Header'
import '../style/post.css'
import { useParams } from 'react-router-dom'
const Readpost = ({cudetails}) => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    console.log(postData);
    const backgroundStyle = {
        backgroundImage: `url(http://localhost:3500/uploads/${postData?.image.filename})`,
        backgroundColor: 'transparent', // Fallback color if the image is unavailable
        height: '50vh',
        width:'100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      };
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3500/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const postData = await response.json();

                // Format the postTime
                const postDate = new Date(postData.postTime);
                const formattedDate = `${postDate.getFullYear()}-${(postDate.getMonth() + 1).toString().padStart(2, '0')}-${postDate.getDate().toString().padStart(2, '0')} ${postDate.getHours().toString().padStart(2, '0')}:${postDate.getMinutes().toString().padStart(2, '0')}:${postDate.getSeconds().toString().padStart(2, '0')}`;
                postData.formattedPostTime = formattedDate;

                setPostData(postData);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPost();
    }, [id]);
  return (
    <div className="readpost">
       <Header cudetails={cudetails}/>
       <div className="viewpost">
        <Paper sx={{backgroundColor:'transparent', width:'30%', marginTop:'20px', height:'50vh',marginLeft:"50px" }} elevation={8}>
            <div style={backgroundStyle}></div>
        </Paper>
        <Paper sx={{backgroundColor:'#c3e0868d', width:'50%', marginTop:'20px', height:'85vh',marginLeft:"50px", 
                    display:'flex', flexDirection:'column', alignItems:"start", fontFamily: 'Roboto, sans-serif'  }} elevation={8}>
            <Paper sx={{width:"100%", borderBottom:'2px solid black', height:'10vh', color:'#323727', backgroundColor:"#c3e0868d"}}>
                <h1 style={{fontWeight:'bolder'}}>{postData?.title}<span>     ({new Date(postData?.postTime).toLocaleDateString()})</span></h1>
            </Paper>
            <Paper sx={{width:"100%", height:'50vh', marginTop:'5vh', backgroundColor:"#c3e0868d" }}>
                <h2>Content:</h2>
                <p>{postData?.content}</p>
            </Paper>
            <Paper sx={{width:"100%", height:'18vh', marginTop:'2vh', backgroundColor:"#c3e0868d"}}>
                <h2>Tags</h2>
                {postData?.tags.map((tag, index) => (
              <p key={index}>{tag.replace(/[\[\]"]+/g, '')}</p>
            ))}
            </Paper>
        </Paper>
       </div>
    </div>
  )
}

export default Readpost