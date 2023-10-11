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
  const [newAccount, setNewAccount] = useState(false);

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
        <button>{newAccount ? "create Account" : "Login in"}</button>
      </form>
    </div>
  );
}
