"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import Likes from "./Likes";
import Comments from "./Comments";
import { socket } from "../../socket";
import { AuthContext } from "./AuthProvider";
import { FeedContext } from "./FeedContext";

// const socket = io('http://localhost:5000');

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likesCount);
  const [comments, setComments] = useState(post.comments);
  const { userId } = useContext(AuthContext);
  const {updateLikeCount} = useContext(FeedContext);

  socket.on("like_change", (data) => {
    console.log("Like data received: ", data);
    updateLikeCount(data.postId, data.likesCount);

  });

  const handleLike = async () => {
    await axios.post(`https://flock-space-server.vercel.app/api/post/${post._id}/like`, {
      userId: localStorage.getItem("userId"),
    });
    const response = await axios.get(`https://flock-space-server.vercel.app/api/feed?userId=${userId}`);
    const updatedPost = response.data.find((item) => item._id === post._id);

    if (updatedPost) {
      setLikes(updatedPost.likesCount);
    }
    // socket.emit('like', post._id);
  };

  const handleComment = async (text) => {
    await axios.post(`https://flock-space-server.vercel.app/api/post/${post._id}/comment`, {
      userId: localStorage.getItem("userId"),
      text: text,
    });
    // console.log(text);
    const response = await axios.get(`https://flock-space-server.vercel.app/api/feed?userId=${userId}`);
    const updatedPost = response.data.find((item) => item._id === post._id);

    if (updatedPost) {
      setComments(updatedPost.comments);
    }
    // socket.emit('comment', post._id);
  };

  return (
    <div className=" w-full border-b-2 border-b-slate-400 pb-2 mt-8">
      <p className="pb-1 font-bold text-lg">@{post.createdBy.username}</p>
      <div className="w-full flex items-center justify-center">
        <img
          className="w-full h-[500px] object-cover rounded"
          src={`https://flock-space-server.vercel.app${post.imageUrl}`}
          alt="Post"
        />
      </div>
      <p className="pl-1 pt-2">{post.description}</p>
      <div className="flex items-start">
        {/* <button className="pl-1 " onClick={handleLike}>
          {" "}
          <FavoriteBorder />
        </button>
        <button>
          <ChatBubbleOutline className="mb-5 cursor-pointer" onClick={handleComment} />
        </button> */}

        <Likes className="pl-1 pt-1 " likes={likes} onLike={handleLike} />
        <Comments className="my-2" comments={comments} onComment={handleComment} />
      </div>
    </div>
  );
};

export default Post;
