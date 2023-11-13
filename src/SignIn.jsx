import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
let Navigate= useNavigate('')
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

const SigninUser = async() =>{
  try {
   await signInWithEmailAndPassword(auth, email, password);
  
   toast('sigin is successfuly done', {type:'success'})
    Navigate('/')
  } catch (error) {
    toast('error signin is not done', {type:'error'})
  }
}

  return (
    <div style={{margin:'20rem'}}>
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
    
    <button onClick={SigninUser} className='btn btn-primary'>Signin</button>
   
    </div>
  )
}

export default SignIn