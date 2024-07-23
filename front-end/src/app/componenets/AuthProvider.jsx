"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  userId: "",
  signInUser: () => {},
  signOutUser: () => {},
});

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if(id && id.length)
        signInUser(id);
  }, []);

  const signInUser = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };
  const signOutUser = () => {
    localStorage.removeItem("userId");
    setUserId("");
  };
  return <AuthContext.Provider value={{ userId, signInUser, signOutUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
