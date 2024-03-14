import React from 'react'
import Post from './Post'
import cake from '../../media/cake.jpeg'
import rain from '../../media/rain.jpeg'
import summer from '../../media/summer.jpeg'
import water from '../../media/waterfalls.jpeg'

const Dashmain = ({post}) => {
  
  return (
    <div className='dashmain'>
      {post.map(post=> <Post key={post.id} post={post}/>)}
    </div>
  )
}

export default Dashmain