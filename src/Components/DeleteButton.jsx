import {  deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteButton = ({id, imageUrl}) => {


   const handleDelete = async() =>{
    try {
        const docRef = doc(db, 'Courses', id);
        await deleteDoc(docRef);
        toast('document deleted successfully', {type:'success'})
         const storageRef = ref(storage, imageUrl)
        deleteObject(storageRef);
    } catch (error) {
        toast('error document is not delete', {type:'error'})
    }
   }
  return (
    <div>
        <p onClick={handleDelete} style={{color:'red', cursor:'pointer'}}>Supprimer</p>
    </div>
  )
}

export default DeleteButton