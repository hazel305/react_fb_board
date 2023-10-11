import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

export default function AppRouter({ isLoggedIn }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />}></Route>
      ) : (
        <Route path="/" element={<Auth />}></Route>
      )}
    </Routes>
  );
}
