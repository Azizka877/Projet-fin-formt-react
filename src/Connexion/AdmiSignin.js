import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
const AdmiSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     const Navigate = useNavigate()

     const AdmiSignin = async()=>{
        try {
          await signInWithEmailAndPassword(auth, email, password)
          toast('User has register succesfuly', {type: 'success'})
          Navigate('/')
        } catch (error) {
          toast(' Error User has not register ', {type: 'error'})
          
        }
      }
  return (
    <div style={{width:'400px', backgroundColor:'#102c57'}}>
         <input type="email" name='email' placeholder='Your Email...' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
         <button onClick={AdmiSignin}>Sign In</button>
    </div>
  )
}

export default AdmiSignin