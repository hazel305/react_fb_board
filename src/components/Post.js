import React from 'react';

export default function Post({postObj,userConfirm}) {
  return (
    <li key={postObj.id}>
        <h4>{postObj.content}</h4>
        {userConfirm &&
        <>
         <button>Delete</button>
        <button>Edit</button>
        </>}
        
       
    </li>
        
  )
}
