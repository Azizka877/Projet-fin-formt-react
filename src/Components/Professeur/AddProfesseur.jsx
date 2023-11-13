import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { db, storage } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListeProfesseur from '../ListeProfesseurs';



const AddProfesseur = ({profil}) => {

  const [formData, setFormData] = useState({
    name: '',
    profil:'',
    title: '',
    Numero:'',
    email:'',
    NombreCours: '',
})
const [progress, setProgress] = useState(0);


    const  handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value })
    }
    const  handleImageChange = (e)=>{
        setFormData({...formData, profil: e.target.files[0] })
    }

    const handlePublish = () => {
      if (!formData.name) {
        alert('Please fill in the name');
        return;
      } else if (!formData.profil) {
        alert('Please upload an image');
        return;
      } else if (!formData.Numero) {
        alert('Please fill a number');
        return;
      }else if (!formData.email) {
        alert('Please upload an email');
        return;
      }
    
      const storageRef = ref(
        storage,
        `/Picture/${Date.now()}${formData.profil.name}`
      );
      const uploadPicture = uploadBytesResumable(storageRef, formData.profil);
      uploadPicture.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (err) => {
          console.log(err);
        },
        () => {
          setFormData({
            name: '',
            profil: '',
            Numero: '',
            email: '',
            NombreCours: '',
          });
    
          getDownloadURL(uploadPicture.snapshot.ref)
            .then((url) => {
              const professeurRef = collection(db, 'Professeurs');
              addDoc(professeurRef, {
                name: formData.name,
                profil: url, // Use the retrieved download URL instead of the file object
                Numero: formData.Numero,
                email: formData.email,
                NombreCours:formData.NombreCours,
              })
                .then(() => {
                  toast('prof is added successfully', { type: 'success' });
                })
                .catch((err) => {
                  toast('error adding prof', { type: 'error' });
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    };


  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
      
        <div className='border p-3 mt-5 bg-light
     d-flex align-items-center
     justify-content-center flex-column'
     style={{margin:'15rem', width:'400px'}}>
      
      
       
           <h2>Add Professeur</h2>
           {/* Name */}
            <label htmlFor="">Name</label>
            <input type="text" name="name" 
            className='form-control'
             value={formData.name}
              onChange={(e)=>handleChange(e)} />
              {/* Numero */}
            <label htmlFor="">Numero</label>
            <input type="number" name="Numero" 
            className='form-control'
            value={formData.Numero}
            onChange={(e)=>handleChange(e)} />
             {/* email */}
             <label htmlFor="">Email</label>
            <input type="email" name="email" 
            className='form-control'
             value={formData.email}
              onChange={(e)=>handleChange(e)} />
             
             <label htmlFor="">Nombre de cours</label>
            <input type="number" name="NombreCours" 
            className='form-control'
             value={formData.NombreCours}
              onChange={(e)=>handleChange(e)} />


         {/* image */}
         <label htmlFor="">Profil</label>
         <input type="file" 
         accept='image/*' 
         className='form-control'
          onChange={(e)=>handleImageChange(e)} />


          {/* progress */}
         {progress === 0 ? null : ( <div className="progress">
            <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}`}}>{`uploading image ${progress}%`}</div>
         </div>)}
        
         <button className='form-control btn-primary mt-2' onClick={handlePublish}>Publish</button>
    </div>
    </div>
     <div className="col-md-12">
      <ListeProfesseur profil={profil} />
     </div>
    </div>
    </div>
  )
}

export default AddProfesseur