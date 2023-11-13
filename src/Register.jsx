import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from './firebaseConfig';
import { toast } from 'react-toastify';


export const Register = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

const register = async() =>{
  try {
   await createUserWithEmailAndPassword(auth, email, password);
   updateProfile(auth.currentUser, {
    displayName: name,
   })
   toast('sigin is successfuly done', {type:'success'})
    
  } catch (error) {
    toast('error signin is not done', {type:'error'})
  }
}

  return (
   
    
   <div style={{margin:'20rem'}}>
     <div className="mb-3 "  >
       <label for="name" class="form-label">Name</label>
       <input type="text"
        className="form-control"
        id="name"
        value={name}
         placeholder="Your Name"
         onChange={(e) =>setName(e.target.value)}
         />
    </div>
    <div className="mb-3">
       <label  className="form-label">Email address</label>
       <input type="email" className="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
        value={email}
        onChange={(e) =>setEmail(e.target.value)} />
    </div>
    <div className="mb-3">
       <label  className="form-label">Password</label>
       <input type="password" 
       className="form-control" 
       id="password" 
       value={password}
       placeholder="Your password"
       onChange={(e) =>setPassword(e.target.value)}
       />
    </div>
    
    <button onClick={register} className='btn btn-primary'>Register</button>
   
    </div>
    
  )
}
