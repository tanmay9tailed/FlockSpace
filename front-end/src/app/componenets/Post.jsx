import React, { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Likes from "./Likes";
import Comments from "./Comments";

// const socket = io('https://flock-space-server.vercel.app');

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments);

  const handleLike = async () => {
    await axios.post(`http://localhost:5000/api/post/${post._id}/like`, {
      userId: localStorage.getItem("userId"),
    });
    const response = await axios.get(`http://localhost:5000/api/feed`);
    const updatedPost = response.data.find((item) => item._id === post._id);

    if (updatedPost) {
      setLikes(updatedPost.likesCount);
    }
    // socket.emit('like', post._id);
  };

  const handleComment = async (text) => {
    await axios.post(`http://localhost:5000/api/post/${post._id}/comment`, {
      userId: localStorage.getItem("userId"),
      text: text
    });
    console.log(text);
    const response = await axios.get(`http://localhost:5000/api/feed`);
    const updatedPost = response.data.find((item) => item._id === post._id);

    if (updatedPost) {
      setComments(updatedPost.comments);
    }
    // socket.emit('comment', post._id);
  };

  return (
    <div className=" w-full border-b-2 border-b-slate-400 pb-2 mt-8">
      <div className="w-full flex items-center justify-center">
        <img className="w-3/4 rounded" src={`http://localhost:5000${post.imageUrl}`} alt="Post" />
      </div>
      <p className="pl-10 mt-2 font-bold">Description: {post.description}</p>
      <Likes className="pl-10 flex items-center gap-2" likes={likes} onLike={handleLike} />
      <Comments className='my-2 pl-2' comments={comments} onComment={handleComment} />
    </div>
  );
};

export default Post;
