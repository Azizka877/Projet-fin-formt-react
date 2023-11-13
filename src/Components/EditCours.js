import React, { useEffect, useState } from 'react';
import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ref, uploadBytes } from 'firebase/storage';


function EditCours() {
let navigate = useNavigate()
    const { id } = useParams(); // Récupère l'ID du professeur à éditer depuis l'URL
    const [cours, setCours] = useState({});
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [profil, setProfile] = useState()
    const [NombreCours, setNombreCours] = useState()

  
    useEffect(() => {
        const fetchCours = async () => {
          try {
            const coursDoc = doc(db, 'Courses', id);
            const coursSnapshot = await getDoc(coursDoc);
            if (coursSnapshot.exists()) {
              setCours(coursSnapshot.data());
              setUpdatedTitle(coursSnapshot.data().title)
              setNombreCours(coursSnapshot.data().nombreCours)
              setProfile(coursSnapshot.data().profil)
              console.log(coursSnapshot)
            } else {
              // Gérer le cas où le professeur n'est pas trouvé
            }
          } catch (error) {
            console.error('Erreur lors de la récupération du professeur :', error);
            // Gérer l'erreur
          }
        };
    
        fetchCours();
      }, [id]);
    

      const handleTitleChange = (e) => {
        setUpdatedTitle(e.target.value);
      };
      const handleNombreCoursChange = (e) => {
        setUpdatedTitle(e.target.value);
      };

      
      const handleUpdateCours = async () => {
        try {
          const coursesDoc = doc(db, 'Courses', id);
          await updateDoc(coursesDoc, { title: updatedTitle, profil: profil });
          // Mettre à jour le nom du professeur
          setCours((prevCours) => ({ ...prevCours,title: updatedTitle, profil: profil  }));
          // Rediriger vers la liste des professeurs ou une autre page après la mise à jour
              toast('data upload successfuly',{type:'success'})
              navigate('/articles')
        } catch (error) {
          console.error('Erreur lors de la mise à jour du professeur :', error);
          // Gérer l'erreur
        }
      };

  return (
    
     <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input type="text" className='form-control' value={updatedTitle} onChange={handleTitleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="Numero">Nombre d'heures</label>
              <input
                type="number"
                className="form-control"
                value={NombreCours}
                name='NombreCours'
                onChange={handleNombreCoursChange}
                
              />
            </div>
                  <button onClick={handleUpdateCours} className='btn btn-primary w-25'>Editer</button>
                  <Link to='/'>
                      <button  className='btn btn-success'>retour</button>
                  </Link>
         </div>
        
       <div className="col-md-2"></div>

    </div> 
    </div>     
   
  )
}

export default EditCours