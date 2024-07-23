"use client";
import { useState, useEffect, useContext } from "react";
import Post from "../componenets/Post";
import axios from "axios";
import { AuthContext } from "../componenets/AuthProvider";
import { FeedContext } from "../componenets/FeedContext";

const Page = () => {
  // const [posts, setPosts] = useState([]);
  const { feed, setFeed } = useContext(FeedContext);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) fetchPosts();

    // console.log(userId)
    // console.log(posts);
    // socket.on('update', fetchPosts);

    // return () => {
    //   socket.off('update', fetchPosts);
    // };
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://flock-space-server.vercel.app/api/feed?userId=${userId}`);
      console.log(response.data);
      // setPosts(response.data);
      setFeed(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="">
      {feed.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Page;
