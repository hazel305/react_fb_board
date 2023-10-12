import React,{useEffect, useState} from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, onSnapshot,query,orderBy } from "firebase/firestore"; 
import Post from '../components/Post';

const Home = ({userObj})=>{
  const [post,setPost] = useState('');
  const [posts,setPosts] = useState([]);
  // console.log(userObj);
 
  
  const onChange = (e)=>{
    //const val = e.target.value; //ECMA Script 2012
    const {target:{value}} = e; //ES6
    setPost(value);
  }
  const onSubmit = async (e) =>{
    e.preventDefault();

    try{
        const docRef = await addDoc(collection(db, "posts"), {
          content: post,
          date: serverTimestamp(),
          uid: userObj
        });
        // console.log("Document written with ID: ", docRef.id);
        setPost("");
      } catch(e){
      // console.log(e);
    }
  }
  // const getPosts = async () =>{
  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   querySnapshot.forEach((doc) => {
  //     const postObj = {
  //       ...doc.data(),
  //       id:doc.id
  //     }      
  //     setPosts((prev)=>[postObj,...prev]);
  //   });
  // }

  useEffect(()=>{
    // getPosts();
    const q = query(collection(db, "posts"), orderBy("date"));
  onSnapshot(q, (querySnapshot) => {
  // const postList = [];
  // querySnapshot.forEach((doc) => {
  //   postList.push(doc.data().name);
  // });
  // console.log("Current cities in CA: ", postList.join(", "));

  const postArr=querySnapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  }))
  setPosts(postArr);
  // console.log(postArr);
  });
  },[])

  

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="post" value={post} placeholder='포스트 쓰기' onChange={onChange}></input>
        <input type="submit" value="입력"></input>
      </form>
      <ul>
      {
        posts.map(item=><Post key={item.id} postObj={item} userConfirm={item.uid===userObj}/>)
      }
      </ul>
    </div>
  )
}

export default Home;