"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AuthContext } from "./AuthProvider";

const Navbar = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(authContext.userId);
    }
  }, [authContext.userId]);

  const handleLogout = () => {
    authContext.signOutUser();
    // localStorage.removeItem("userId");
    router.replace("/");
  };

  return (
    <nav className=" h-[70px] w-[500px] flex bg-slate-800 justify-between py-5 px-8 text-white fixed">
      <div>
        <button
          className="py-2 text-2xl font-bold font-mono"
          onClick={() => {
            router.replace("/feed");
          }}
        >
          Sociogram
        </button>
      </div>
      <ul className="flex gap-8">
        {userId ? (
          <li className="flex flex-col items-center justify-center pt-4">
            <button
              className=""
              onClick={() => {
                router.replace("/posts/new");
              }}
            >
              <AddCircleOutlineIcon />
            </button>
            <span>Upload</span>
          </li>
        ) : (
          <></>
        )}
        {userId ? (
          <li>
            <button className="bg-red-500 py-2 px-5 rounded-md hover:bg-red-600 shadow-lg" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
