import React,{useEffect, useState} from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, onSnapshot,query,orderBy } from "firebase/firestore"; 
import { getStorage, ref, uploadString, getDownloadURL   } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Post from '../components/Post';

const Home = ({userObj})=>{
  const [post,setPost] = useState('');
  const [posts,setPosts] = useState([]);
  //첨부이미지 저장 state
  const [attachment,setAttachment] = useState();
  // console.log(userObj);


  
  const onChange = (e)=>{
    //const val = e.target.value; //ECMA Script 2012
    const {target:{value}} = e; //ES6
    setPost(value);
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    //참조만들기
    const storage = getStorage();
    const storageRef = ref(storage, `${userObj}/${uuidv4()}`); //이참조는 저파일이라고 알려줌
    
    uploadString(storageRef, attachment, 'data_url').then(async(snapshot) => {
      console.log('파일 업로드 성공');
      const attachtmentUrl =await getDownloadURL(storageRef);
      // console.log(attachtmentUrl);
      try{
        // const docRef = await addDoc(collection(db, "posts"), {
          await addDoc(collection(db, "posts"), {
          content: post,
          date: serverTimestamp(),
          uid: userObj,
          attachtmentUrl
        });
        // console.log("Document written with ID: ", docRef.id);
        setPost("");
      } catch(e){
      console.log(e);
    }
    });


    
  }
 
  useEffect(()=>{
    // getPosts();
    const q = query(collection(db, "posts"), orderBy("date"));
  onSnapshot(q, (querySnapshot) => {

  const postArr=querySnapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  }))
  setPosts(postArr);
  // console.log(postArr);
  });
  },[])

  const onPreviewImgChange = (e)=>{
     console.log(e.target.files[0]);
     //const theFile = e.target.files[0];
     const {target:{files}}= e;
     const theFile = files[0];

     const reader = new FileReader();
     reader.onloadend= (e)=>{
      setAttachment(e.target.result)
     }
     reader.readAsDataURL(theFile);
  }
  console.log(attachment);

  const onPreviewImgClear  =()=>{
    setAttachment(null);
    document.querySelector("#attachment").value=null; //파일에 이름 초기화
  }
  

  return(
    <div>
      <form onSubmit={onSubmit}>
        <p>
        <label htmlFor="content">내용</label>
        <input type="text" name="post" value={post} placeholder='포스트 쓰기' onChange={onChange}></input>
        </p>
        <p>
        <label htmlFor="attachment">첨부이미지</label>
        <input type="file" accept="images/*" onChange={onPreviewImgChange}/>
        {attachment && 
        <>
          <img src={attachment} alt="" width="50" height="50"/>
          <button type='button' onClick={onPreviewImgClear}>이미지취소</button>
        </>
        }
        </p>
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