import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';

function SearchCours() {

  const [searchTerm, setSearchTerm] = useState('');
  const [cours, setCours] = useState([]);





  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  



  useEffect(() => {
    // Étape 1: Créez une référence à la collection Firestore "Courses"
    const coursRef = collection(db, 'Courses');
  
    // Étape 2: Initialisez une variable 'q' pour stocker la requête Firestore
    let q = coursRef;
  
    // Étape 3: Vérifiez si 'searchTerm' a une valeur
    if (searchTerm) {
      // Étape 4: Si 'searchTerm' existe, créez une requête avec une clause 'where' pour filtrer par titre
      q = query(
        coursRef,
        where('title', '>=', searchTerm)
      );
    } else {
      // Étape 5: Si 'searchTerm' est vide, créez une requête avec un tri 'orderBy' sur le champ 'lesson'
      q = query(
        coursRef,
        orderBy('lesson', 'desc')
      );
    }
  
    // Étape 6: Ajoutez un écouteur de snapshot à la requête Firestore 'q'
    onSnapshot(q, (snapshot) => {
      // Étape 7: La fonction de rappel est appelée chaque fois que les données changent
  
      // Étape 8: Filtrer les documents du snapshot pour garder ceux avec 'lesson' > 100
      const cours = snapshot.docs
        .filter((doc) => doc.data().lesson > 100)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
      // Étape 9: Mettez à jour l'état 'cours' avec les cours filtrés
      setCours(cours);
    });
  }, [searchTerm]);
  
  return (
    <div>
    <input
             type="search"
             placeholder="What do you want to learn ?"
             value={searchTerm}
             onChange={handleSearchChange}
  />
    </div>
  )
}

export default SearchCours