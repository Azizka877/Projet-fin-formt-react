import React, { useEffect, useState } from 'react';
import {  doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type } from '@testing-library/user-event/dist/type';
import { ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';

const EditProfesseur = () => {
  
let navigate = useNavigate()
  
  const [telephon, setTelephon] = useState();
  const [email, setEmail] = useState('');
  const [nombreCours, setNombreCours] = useState('');
  const { id } = useParams(); // Récupère l'ID du professeur à éditer depuis l'URL
  const [professeur, setProfesseur] = useState({});
  const [updatedName, setUpdatedName] = useState('');
  const [profil, setProfile] = useState()



  useEffect(() => {
    const fetchProfesseur = async () => {
      try {
        const professeurDoc = doc(db, 'Professeurs', id);
        const professeurSnapshot = await getDoc(professeurDoc);
        if (professeurSnapshot.exists()) {
          setProfesseur(professeurSnapshot.data());
          setUpdatedName(professeurSnapshot.data().name);
          setEmail(professeurSnapshot.data().email)
          setTelephon(professeurSnapshot.data().Numero)
          setNombreCours(professeurSnapshot.data().NombreCours)
          setProfile(professeurSnapshot.data().profil)
          console.log(professeurSnapshot)
        } else {
          // Gérer le cas où le professeur n'est pas trouvé
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du professeur :', error);
        // Gérer l'erreur
      }
    };

    fetchProfesseur();
  }, [id]);

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNumberChange = (e) => {
    setTelephon(e.target.value);
  };
  const handleNcoursChange  = (e) => {
    setNombreCours(e.target.value);
   };
  

   

   const handleImageChange = async (e) => {
    
    const file = e.target.files[0];

    if (file) {
      // Créez une référence unique pour le fichier dans Firebase Storage
      const storageRef = ref(db, `images/${id}/${file.name}`);
  
      try {
        // Téléchargez le fichier dans Firebase Storage
        await uploadBytes(storageRef, file);
        
        // Mettez à jour le profil avec l'URL du fichier stocké dans Firebase Storage
        const imageURL = `https://storage.googleapis.com/${storageRef}/${storageRef}`;
        setProfile(imageURL);
      } catch (error) {
        // console.error('Erreur lors du téléchargement de l\'image :', error);
        console.error('Aucun fichier sélectionné.');
      }
    }
  };






  const handleUpdateProfesseur = async () => {
    try {
      const professeurDoc = doc(db, 'Professeurs', id);
      await updateDoc(professeurDoc, { 
        name: updatedName, 
        email: email, 
        Numero: telephon, 
        NombreCours: nombreCours, 
        profil: profil 
      });
      // Mettre à jour le nom du professeur
      setProfesseur((prevProfesseur) => ({ ...prevProfesseur, 
        name: updatedName, 
        email: email, 
        Numero: telephon,  
        profil: profil 
      }));
      // Rediriger vers la liste des professeurs ou une autre page après la mise à jour
          toast('data upload successfuly',{type:'success'})
          navigate('/listeProf')
    } catch (error) {
      console.error('Erreur lors de la mise à jour du professeur :', error);
      // Gérer l'erreur
    }
  };
  
//   useEffect(() => {
//     getImage();
// }, []);

// function getImage() {
//     axios.get(`imageURL`, +id).then(function(response) {
//         console.log(response);
//         setProfile(response.data.Professeurs);
//     });
// }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input type="text" className='form-control' value={updatedName} onChange={handleNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="Numero">Numéro de téléphone</label>
              <input
                type="number"
                className="form-control"
                value={telephon}
                name='number'
                onChange={handleNumberChange}
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombreCours">Nombre de Cours</label>
              <input type="number" className='form-control' value={nombreCours} onChange={handleNcoursChange} />
            </div>

            <div className="form-group">
              <label >image</label>
              <input
                type="file"
                name='profil'
                // onChange={}  
                onChange={(e)=>setProfile(e.target.files[0]) && handleImageChange}
              />
            </div>
            
            <button  className="btn btn-primary" onClick={handleUpdateProfesseur}>
              Sauvegarder
            </button>
            <Link to="/listeProf">
              <button className="btn btn-success ml-2">Retour à la liste</button>
            </Link>
        
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

export default EditProfesseur;
