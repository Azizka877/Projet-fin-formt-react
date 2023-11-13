import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const AdmiRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

     const Navigate = useNavigate()

     const AdmiRegister = async()=>{
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          toast('User has register succesfuly', {type: 'success'})
          Navigate('/')
        } catch (error) {
          toast(' Error User has not register ', {type: 'error'})
          
        }
      }
  return (
    <div className='d-flex flex-column' style={{
        width:'400px'
    }}>
        <input type="text" name='name' placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" name='email' placeholder='Your Email...' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
         <button onClick={AdmiRegister}>Register</button>
    </div>
  )
}
