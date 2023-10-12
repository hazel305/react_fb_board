import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();
  const auth = getAuth();
  const onLogoutClick = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };
  return (
    <div>
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
}
