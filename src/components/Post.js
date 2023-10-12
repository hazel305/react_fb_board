import React from 'react';

export default function Post({postObj,id}) {
  return (
    <li key={postObj.id}>
        <h4>{postObj.content}</h4>
        <button>Delete</button>
        <button>Edit</button>
    </li>
  )
}
