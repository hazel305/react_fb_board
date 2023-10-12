import React, { useState } from "react";
import { authService } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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


  const toggleAccount = ()=>{
     setNewAccount((prev)=>!prev);
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
        <button type="button">{newAccount ? "Google 회원가입" : "Google 로그인"}</button>
      </form>

      <hr/>
      <button type='button' onClick={toggleAccount}>{newAccount?"로그인":"회원가입"}</button>
      {error}
     
    </div>
  );
}
