import React, { useState } from "react";

const Comments = ({ comments, onComment, className }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text != "") {
      onComment(text);
      setText("");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          className=" py-1 px-4 rounded-l-lg"
        />
        <button type="submit" className="bg-green-500 py-1 px-4 rounded-r-lg">
          Comment
        </button>
      </form>
      <ul className="pl-4 ">
        {comments.map((comment, index) => (
          <li key={index} className="bg-slate-200 pl-4 my-1 rounded-full max-w-[70%]">{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
