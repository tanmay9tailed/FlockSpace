"use client";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const FeedContext = createContext({
  feed: [],
  setFeed: () => {},
  updateLike: () => {},
  updateLikeCount: () => {},
});

const FeedProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [feed, setFeed] = useState([]);
  const updateLike = (postId, likedBy, isLike) => {
    const newFeed = feed.slice();
    const post = newFeed.find((post) => post._id === postId);
    if (userId === likedBy) {
      post.likedByUser = isLike;
    }
    setFeed(newFeed);
  };

  const updateLikeCount = (postId, likesCount) => {
    const newFeed = feed.slice();
    const postIndex = newFeed.findIndex((post) => post._id === postId);
    const post = newFeed[postIndex];
    if (postIndex >= 0) {
      post.likesCount = likesCount;
      newFeed[postIndex] = { ...post };
      setFeed(newFeed);
    }
  };
  return <FeedContext.Provider value={{ feed, setFeed, updateLike, updateLikeCount }}>{children}</FeedContext.Provider>;
};

export default FeedProvider;
