import React, { useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      // ...
    } else {
      // User is signed out
      setIsLoggedIn(false);
    }
  });
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
