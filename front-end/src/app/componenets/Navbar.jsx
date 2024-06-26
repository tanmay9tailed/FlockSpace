"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.replace('/home')
  };

  return (
    <nav className=" h-[70px] w-[500px] flex bg-slate-800 justify-between py-5 px-8 text-white fixed">
      <div><button onClick={() => {router.replace('/feed')}}>LOGO</button></div>
      <ul className="flex gap-6">
        {userId ? <li><button onClick={() => {router.replace('/posts/new')}}>Create Post</button></li> : <></>}
        {userId ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
