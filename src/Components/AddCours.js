
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth, storage, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

function AddArticle() {

  const navigate = useNavigate()
      const [user] = useAuthState(auth);
     const [formData, setFormData] = useState({
        title: '',
        description: '',
        lesson: 0,
        image : '',
        createdAt : Timestamp.now().toDate(),
        completed: false,
       
     })
const [progress, setProgress] = useState(0)

const handleChange = (e) => {
setFormData({...formData, [e.target.name] : e.target.value})
}
const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0]})
}

const handlePublish =()=>{
    if(!formData.title || !formData.description || !formData.image){
        alert('Fill all the fields');
        return; 
    } 
    const storageRef = ref(storage,`/images/${Date.now()}${formData.image.name}`);
    
  const uploadImage=  uploadBytesResumable(storageRef, formData.image)
  
  uploadImage.on('state_changed', (snapshot)=>{
    const progressPercent = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progressPercent)
  }, 
  (err)=>{console.log(err);
  }, () =>{
    setFormData({
      title: '',
      description: '',
      image : '',
      lesson: 0,
    });
    getDownloadURL(uploadImage.snapshot.ref)
    .then((url)=>{
      const articleRef = collection(db, "Courses")
      addDoc(articleRef,{
        title:formData.title,
        description: formData.description,
        imageUrl: url,
        createdAt : Timestamp.now().toDate(),
        createdBy : user.displayName,
        lesson: formData.lesson,
        completed: formData.completed,
        userId: user.uid,
        
      })
      .then(()=>{
        toast('Article is added successfuly', {type:"success"})
        setProgress(0);
        navigate('/')
      })
      .catch((err)=>{
        toast("Error adding article", {type:"error"})
      })
    })
  }
  );
};

  return (
    <div className='border p-3 mt-5 bg-light
     d-flex align-items-center
     justify-content-center flex-column'
     style={{margin:'15rem', width:'400px'}}>
      
      {
        !user ?
        <>
            <h2>
        <Link  to='/signin'>Login to create article </Link>
            </h2>
             Don't have an account ? <Link to="/register">Register</Link>
        </>
        : 
        <>
           <h2>Create article</h2>
        <label htmlFor="">Title</label>
        <input type="text" name="title" 
        className='form-control'
         value={formData.title}
          onChange={(e)=>handleChange(e)} />

         {/* description */}
        <label htmlFor="">Description</label>
        <textarea 
         className='form-control'
          name='description'
          onChange={(e)=>handleChange(e)}
          value={formData.description}
          />
           <label htmlFor="">Lesson</label>
            <input type='number'
              className='form-control'
              name='lesson'
              onChange={(e)=>handleChange(e)}
              value={formData.lesson}
            />
             <label htmlFor="">Etat</label>
            <input type='number'
              className='form-control'
              name='lesson'
              onChange={(e)=>handleChange(e)}
              value={formData.completed}
            />

         {/* image */}
         <label htmlFor="">Image</label>
         <input type="file" 
         accept='image/*' 
         className='form-control'
         
           onChange={(e)=>handleImageChange(e)} />
         {progress === 0 ? null : ( <div className="progress">
            <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}`}}>{`uploading image ${progress}%`}</div>
         </div>)}
        
         <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
        </>
      }
        <Link to='/'>
        <button className='btn btn-success mt-5'>Retour</button>
        </Link>
       
    </div>
  )
}

export default AddArticle