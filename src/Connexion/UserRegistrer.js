import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const UserRegistrer = () => {
      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const RegisterUser = async()=>{
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        toast('User has register succesfuly', {type: 'success'})
        navigate('/signUser')
      } catch (error) {
        toast(' Error User has not register ', {type: 'error'})
        
      }
    }
  return (
    <div>
        <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
         <button onClick={RegisterUser}>Register</button>
    </div>
  )
}

export default UserRegistrer