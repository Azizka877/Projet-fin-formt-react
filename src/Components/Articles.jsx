import {  collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';



const Articles = () => {
      const [articles, setArticles] = useState([]);
      const [completedCoursesCount, setCompletedCoursesCount] = useState(0);
  
     
    
            useEffect(
                () => {
            const articlesRef = collection(db, "Courses");
            const q = query(articlesRef, orderBy('createdAt', 'desc' ));
            onSnapshot(q, (snapshot)=>{
                console.log(snapshot.docs.data);
               const articles = snapshot.docs.map((doc)=>({
                id: doc.id,    
                ...doc.data(),
                title: doc.data().title,
                })); 
               setArticles(articles);
               console.log(articles);
            });
            }, []);

            const markCourseAsComplete = (courseId) => {
              // Récupérez une référence au document du cours dans Firestore
              const courseRef = doc(db, 'Courses', courseId);
            
              // Utilisez la fonction update pour marquer le cours comme complet
              // Supposez que vous ayez un champ "completed" dans votre modèle de données
              updateDoc(courseRef, {
                completed: true,
              }).then(() => {
                // La mise à jour de la base de données a réussi
                // Incrémente le compteur
                setCompletedCoursesCount(completedCoursesCount + 1);
 

              }).catch((error) => {
                console.error("Erreur lors de la mise à jour du cours :", error);
              });
            };
//archiver un cour
            const archiveCourse = (courseId) => {
              // Récupérez une référence au document du cours dans Firestore
              const courseRef = doc(db, 'Courses', courseId);
          
              // Utilisez la fonction update pour marquer le cours comme archivé
              // Supposez que vous ayez un champ "archived" dans votre modèle de données
              updateDoc(courseRef, {
                archived: true, // Vous pouvez définir le champ "archived" comme true
              }).then(() => {
                // La mise à jour de la base de données a réussi
                // Vous pouvez effectuer d'autres actions ici si nécessaire
              }).catch((error) => {
                console.error("Erreur lors de l'archivage du cours :", error);
              });
            };

  return (
    <div style={{borderRadius:'50px'}}>
     
        <table class="table table-warning table-striped  table-bordered border-dark table-sm table-responsive">
             <thead>
               <tr>
                 <th scope="col">Logo</th>
                 <th scope="col">Module</th>
                 <th scope="col">Auteur</th>
                 <th scope="col">Nombres d'Unites</th>
                 <th scope="col">Date de Publication</th>
                 <th scope="col">Etat</th>
               </tr>
             </thead>
             <tbody>
              {
                articles.length=== 0 ?
                <span>No Articles find</span>
                : (
                  articles.map(({id, title, imageUrl, createdAt, lesson, createdBy, completed})=>(
                  <tr key={id}>
                    <td>
                      <img src={imageUrl} className='img-fluid w-25 h-25' style={{maxHeight:'50px'}} alt="" />
                    </td>
                    <td>{title}</td>
                    <td>{createdBy}</td>
                    <td>{lesson}</td>
                    <td>
                      
                      {createdAt.toDate().toLocaleString()}
                    </td>
                    <td>
                        {completed ? (
                          <span>Cours complet</span>
                        ) : (
                          <button onClick={() => markCourseAsComplete(id)}>Marquer comme complet</button>
                        )}
                    </td>
                  </tr>
                )))
              }
              
             </tbody>
        </table>
        <Link to='/'>
         <button className='btn btn-lg btn-success'>Retour</button>
        </Link>
    </div>
  )
}

export default Articles