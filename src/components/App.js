import React, { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    if (init === false) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // 사용자 로그인
          setIsLoggedIn(true);
          console.log(user);
        } else {
          // 사용자 로그아웃
          setIsLoggedIn(false);
        }
        setInit(true);
      });
    }
  }, [init]);
  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "회원정보 확인중..."}</>
  );
}

export default App;
