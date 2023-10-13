import React, { useState } from 'react';
import { doc,deleteDoc,updateDoc } from "firebase/firestore";
import { db } from '../firebase';

export default function Post({postObj,userConfirm}) {
  // console.log(postObj);
  const [edit, setEdit] = useState(false);
  const [newPost, setNewPost]= useState(postObj.content);

  const toggleEditMode = ()=>{
    setEdit((prev)=>!prev);
  }

  const editChange = (e)=>{
    // setNewPost(e.target.value);
    let {target:{value}} =e;
    setNewPost(value);
  }


  const editSubmit = async(e)=>{
    e.preventDefault();
    const newPostRef = doc(db, "posts", postObj.id);

    await updateDoc(newPostRef, {
      content: newPost
    });
    setEdit(false);
  }
  
  const deletePost = async()=>{
    if(window.confirm('정말 삭제하시겠습니까?')){
      await deleteDoc(doc(db, "posts", postObj.id)); //문서삭제
    }

  }
  
  return (
    <li key={postObj.id}>
      {edit? 
        (
          <>
           <form onSubmit={editSubmit}>
            <input value={newPost} onChange={editChange} required/>
            <button>edit Post</button>
          </form>
            <button onClick={toggleEditMode}>cancel</button>
          </>
       
        ):(
        <>
          <h4>{postObj.content}</h4>
            {userConfirm &&
              <>
                <button onClick={deletePost}>Delete</button>
                <button onClick={toggleEditMode}>Edit</button>
              </>
            }
        </>)
      }
       
    </li>
        
  )
}
