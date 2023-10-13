import React, { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
 
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // 사용자 로그인
          setIsLoggedIn(true);
          console.log(user);
          setUserObj(user.uid);
        } else {
          // 사용자 로그아웃
          setIsLoggedIn(false);
        }
        setInit(true);
      });
    
  }, []);
  console.log(userObj);
  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "회원정보 확인중..."}</>
  );
}

export default App;
