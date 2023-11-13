import React, { useState } from 'react'
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const ArchiverCours = () => {
      
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

     const handleArchive = () =>{
        
        const coursRef = collection(db, 'ArchivesCours')
        addDoc(coursRef,{
            title,
            description
        }).then(() =>{
            console.log('archive succeed')
            setTitle('')
            setDescription('')
        }).catch(()=>{
            console.log('error');
        })
     }
      

  return (
    <div>
        <h2>Archiver un cours</h2>
        <form >
            <div>
               <label >Titre</label>
               <input type="text" value={title} onChange={(e) =>setTitle(e.target.value)} />
            </div>

            <div>
               <label >Description</label>
               <textarea type="text" value={description} onChange={(e) =>setDescription(e.target.value)} />
            </div>
            <button type='button' onClick={handleArchive}>Archiver</button>
        </form>
    </div>
  )
}

export default ArchiverCours