import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Likes = ({ likes, onLike, className }) => (
  <div className={className}>
    <span className='pt-2'>{likes} </span>
    <button onClick={onLike}> <ThumbUpIcon/></button>
  </div>
);

export default Likes;
