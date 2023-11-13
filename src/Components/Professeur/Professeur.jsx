import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db } from '../../firebaseConfig'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Professeur = () => {
  const [professeurs, setProfesseurs] = useState([])
  const [selectedProf, setSelectedProf] = useState(null);

    useEffect(()=>{
       const professeurRef = collection(db, 'Professeurs');
       const q =query(professeurRef, orderBy('NombreCours', 'desc'))
       onSnapshot(q, (snapshot)=>{
        console.log(snapshot.docs.data);
        const  professeurs = snapshot.docs.filter((doc)=>doc.data().NombreCours > 100).map((doc) =>({
            ...doc.data(),
            id: doc.id,
            
        })
        );
        setProfesseurs(professeurs)
         console.log(professeurs);
       });

    }, [])

// Fonction pour gérer le clic sur une image de professeur
const handleImageClick = (profId) => {
  const selectedProfObj = professeurs.find((prof) => prof.id === profId);
  if (selectedProfObj) {
    setSelectedProf(selectedProfObj);
  }
};



  return (
    <div className='container   w-100' >
        <div className="row">
          <div className="col-md-10">
           <h3>Top Teachers</h3> 
          </div>
          <div className="col-md-2">
           <Link to='/listeProf'>View all</Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 d-flex ">
                  {
                      professeurs.map(({id, profil, name, Note})=>( 
                        <div key={id} className='w-100 d-flex  align-items-center'
                        onClick={() => handleImageClick(id)}
                        style={{cursor:'pointer'}}
                        >
                          <img src={profil} alt="" style={{width:'50px', height:'50px',borderRadius:'20px'}} />
                          {selectedProf && selectedProf.id === id && 
                          <div className='d-flex flex-column' style={{background:'#e5f3fe', width:'100px',borderRadius:'5px', marginRight:'10px'}}>
                            <span>{name}</span>
                            <span className='fs-6'>{Note}</span>
                          </div>
                          }
                        </div>            
                      ))
                    
               
             }
        </div>
     </div>
    </div>
  )
}

export default Professeur