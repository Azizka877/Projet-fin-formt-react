import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../App.css';
import Professeur from './Professeur/Professeur';
import ComposantCompl from './ComposantCompl';
import PopularCours from './PopularCours';
// import { doc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
import Menu from './Menu';
import About from './About';

const Home = () => {

  
  const [completedCoursesCount, setCompletedCoursesCount] = useState(12);



  // const markCourseAsComplete = (courseId) => {
  //   // Récupérez une référence au document du cours dans Firestore
  //   const courseRef = doc(db, 'Courses', courseId);
  
  //   // Utilisez la fonction update pour marquer le cours comme complet
  //   // Supposez que vous ayez un champ "completed" dans votre modèle de données
  //   updateDoc(courseRef, {
  //     completed: true,
  //   }).then(() => {
  //     // La mise à jour de la base de données a réussi
  //     // Incrémente le compteur
  //     setCompletedCoursesCount(completedCoursesCount + 1);


  //   }).catch((error) => {
  //     console.error("Erreur lors de la mise à jour du cours :", error);
  //   });
  // };


  return (
    <div className='container-fluid border border-2 rounded-2' style={{borderColor:'black '}}>
        <div className="row">
        <div className="col-md-1 menu">
        <Menu/>
        </div>
       
      <div className="col-md-7 articles   ">
        <PopularCours  />
        <div className='d-flex mt-5 mb-3'>
           <Professeur />    
        </div>
      </div>
      <div className="col-md-4  ">
          <Calendar />
          <About/>
          <ComposantCompl completedCoursesCount={completedCoursesCount} />
      </div>
      </div>
     </div>
    
  )
}

export default Home