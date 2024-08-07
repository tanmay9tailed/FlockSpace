"use client"; // Ensure this directive is at the top

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadForm = ({ fetchPosts }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure an image file is selected
    if (!image) {
      console.error("Please select an image to upload.");
      return;
    }

    // Create FormData object to send file and data
    const formData = new FormData();
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("image", image);

    try {
      // Send POST request to create post
      const response = await axios.post("https://flock-space-server.vercel.app/api/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form fields after successful upload
      setImage(null);
      setPreview(null);
      setDescription("");
      setErrorMessage("");
      router.replace("/feed");

      // Optionally update posts after new post creation
      if (fetchPosts) {
        fetchPosts();
      }

      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg w-80 mx-auto bg-white mt-5"
    >
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const maxSize = 5 * 1024 * 1024; // 5MB in bytes

          if (file && file.size > maxSize) {
            setErrorMessage("File size exceeds 5MB. Please select a smaller file.");
            setImage(null);
            setPreview(null);
          } else {
            setErrorMessage("");
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
          }
        }}
        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
      />
      {preview && <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="p-2 border rounded-md text-lg"
      />
      <button type="submit" className="p-2 rounded-md bg-green-500 text-white text-lg hover:bg-green-600">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
