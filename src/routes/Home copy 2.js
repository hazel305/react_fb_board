import React, { useEffect, useState } from "react";
import {db} from "../firebase";
import {  addDoc, getDocs, collection, serverTimestamp } from "firebase/firestore"; 

export default function Home() {
  const [post, setPost]= useState("");
  const [posts, setPosts] = useState([]);


  const handleChange = (e)=>{
    // const val = e.target.value; //ECMAscript 2012
    const {target:{value}} = e; //ES6
    setPost(value);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const docRef = await addDoc(collection(db, "posts"), {
        content: post,
        date: serverTimestamp()
      });
      setPost("");
      console.log("Document written with ID: ", docRef.id);
    }catch(error){
      console.log(error)
    }
    
  }



  const getPosts = async () =>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(),
        id:doc.id
      }      
      setPosts((prev)=>[postObj,...prev]);
    });
  }

  useEffect(()=>{
    getPosts();
  },[]);

  // const test = {title:'title1',content:'content1'};
  // const testcopy= {...test, title:"title2"};
  // console.log(testcopy);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='포스트 쓰기' value={post} onChange={handleChange}></input>
        <button type='submit' value="입력">입력</button>
      </form>
      <ul>
      {
        posts.map((item)=><li key={item.id}>{item}</li>)
      }
      </ul>
    </div>
  );
}
