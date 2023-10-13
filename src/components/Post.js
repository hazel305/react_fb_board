import React from 'react';
import { doc,deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function Post({postObj,userConfirm}) {
  console.log(postObj);
  
  const deletePost = async()=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      await deleteDoc(doc(db, "posts", postObj.id)); //문서삭제
    }

  }
  
  return (
    <li key={postObj.id}>
        <h4>{postObj.content}</h4>
        {userConfirm &&
        <>
         <button onClick={deletePost}>Delete</button>
        <button>Edit</button>
        </>}
    </li>
        
  )
}
