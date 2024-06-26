"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import UploadForm from './componenets/UploadForm';
import Post from './componenets/Post';

// const socket = io('http://localhost:5000');
// console.log(socket)
const IndexPage = () => {
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
    // <div>
    //   {/* <UploadForm fetchPosts={fetchPosts} /> */}
    //   {posts.map(post => (
    //     <Post key={post._id} post={post} />
    //   ))}
    // </div>
    <>
    
    </>
  );
};

export default IndexPage;
