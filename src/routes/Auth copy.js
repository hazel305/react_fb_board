import React, { useState } from "react";
import { authService } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth();
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newAccount) {
      //Create Accoutn 회원가입
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
          // ..
        });
    } else {
      //로그인
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(errorMessage);
        });
    }
    setEmail(email);
    setPassword(password);
  };
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  //회원가입-로그인 스위치 토글
  const toggleAccount = ()=>{
     setNewAccount((prev)=>!prev);
  }


  const onSocialClick = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token,user);

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage,email, credential);
    });
  }
  return (
    <div>
      <h2>Auth</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        ></input>
        <button type='submit'>{newAccount ? "회원가입" : "로그인"}</button>
        <button type="button" onClick={onSocialClick}>{newAccount ? "Google 회원가입" : "Google 로그인"}</button>
      </form>

      <hr/>
      <button type='button' onClick={toggleAccount}>{newAccount?"로그인":"회원가입"}</button>
      {error}
     
    </div>
  );
}
