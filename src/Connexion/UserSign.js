import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserSign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const Navigate = useNavigate()

    const SignUser = async()=>{
      try {
        await signInWithEmailAndPassword(auth, email, password)
        toast('User has register succesfuly', {type: 'success'})
        Navigate('/homeUser')
      } catch (error) {
        toast(' Error User has not register ', {type: 'error'})
        
      }
    }
  return (
    <div>
        <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
         <button onClick={SignUser}>Sign In</button>
    </div>
  )
}

export default UserSign