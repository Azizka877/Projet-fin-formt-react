import React from 'react'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';

function DeleteProf({id, profil}) {
    
    const handleDelete = async()=>{
        try {
         const docRef = doc(db, 'Professeurs', id);
         await deleteDoc(docRef);
         toast('document deleted successfully', {type:'success'})
         const storageRef = ref(storage, profil);
         console.log(profil);
          deleteObject(storageRef)
        } catch (error) {
         console.error('Error deleting document:', error);
         toast('error ', {type:'error'})
        }
     }

  return (
    <>
     <button className='btn btn-danger'  onClick={()=>handleDelete(id)}>Delete</button>
    </>
  )
}

export default DeleteProf