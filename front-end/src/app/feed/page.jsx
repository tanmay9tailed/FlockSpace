"use client";
import { useState, useEffect } from "react";
import Post from "../componenets/Post";
import axios from 'axios';

const Page = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    
    // console.log(userId)
    console.log(posts)
    // socket.on('update', fetchPosts);

    // return () => {
    //   socket.off('update', fetchPosts);
    // };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/feed`);
      console.log(response.data)
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error if necessary
    }
  };

  return (
    <div className="">
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Page