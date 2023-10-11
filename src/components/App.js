import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
