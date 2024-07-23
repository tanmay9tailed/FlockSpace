import { FavoriteBorder } from "@mui/icons-material";
import React from "react";

const Likes = ({ likes, onLike, className }) => (
  <div className={className}>
    <button onClick={onLike}>
      {" "}
      <FavoriteBorder />
    </button>
    <div className="font-semibold">
      <span className="pt-2">{likes} </span> Likes
    </div>
  </div>
);

export default Likes;
