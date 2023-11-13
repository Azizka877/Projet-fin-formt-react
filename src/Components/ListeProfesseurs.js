import { collection,  onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig' 
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import DeleteProf from './DeleteProf'

const ListeProfesseur = () => {
  const [professeurs, setProfesseurs] = useState([])

    useEffect(()=>{
       const professeurRef = collection(db, 'Professeurs');
       const q =query(professeurRef, orderBy('name', 'desc'))
       onSnapshot(q, (snapshot)=>{
        console.log(snapshot.docs.data);
        const  professeurs = snapshot.docs.map((doc) =>({
            ...doc.data(),
            id: doc.id
        })
        );
        setProfesseurs(professeurs)
         console.log(professeurs);
       });

    }, [])

   

    // const filterProfessorsWith100Courses = (professors) => {
    //   return professors.filter(professor => professor.NombreCours > 100);
    // };
  


  return (
    <div class="container">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
       <table className='table table-success table-striped table-hover table-bordered table-sm '>
        <thead className='table-primary'>
            <tr>
                <th scope='col'>Profil</th>
                <th scope='col'>Nom </th>
                <th scope='col'>Telephone </th>
                <th scope='col'>Email</th>
                <th scope='col'>NombreCours</th>
                <th scope='col'>Modifier</th>
                <th scope='col'>Supprimer</th>
            </tr>
        </thead>
        <tbody>    
              {
                 professeurs.map(({id, profil, name, Numero, email, NombreCours})=>( 
                       
                        <tr key={id} className='w-100 '>
                            <td >
                               <img src={profil} alt="" style={{width:'50px', height:'50px',borderRadius:'100px',}} />
                            </td>
                            <td className='table-success'>{name}</td>
                            <td>{Numero}</td>
                            <td>{email}</td>
                            <td>{NombreCours}</td>
                            <td>
                               <Link to={`/edit/${id}`}>
                               <button className='btn btn-warning'>Edit</button>
                               </Link>
                            </td>
                            <td>
                                <DeleteProf id={id} profil={profil}   />
                               
                            </td>
                            
                         </tr>
                       
                         
                        
                                
                     ))
              }
              <tr>
                <td>
                    <Link to='/'>
                        <button className='btn btn-success btn-lg'>Home</button>
                    </Link>
                </td>
              </tr>
            
        </tbody>
       </table>
       
       </div>
       <div className="col-md-2"></div>
       </div>
    </div>
  )
}
export default ListeProfesseur