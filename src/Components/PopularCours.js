import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import DeleteButton from './DeleteButton';
import SearchCourses from './SearchCours';


function PopularCours() {
  const [cours, setCours] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    
  useEffect(()=>{
        const coursRef = collection(db, 'Courses');
        const q =query(coursRef, orderBy('lesson', 'desc'))
        onSnapshot(q, (snapshot)=>{
         console.log(snapshot.docs.data);
         const  cours = snapshot.docs.filter((doc)=>doc.data().lesson > 100).map((doc) =>({
             ...doc.data(),
             id: doc.id,
             
         })
         );
         setCours(cours)
          console.log(cours);
        });
 
     }, [])

      // Archivage de cours
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
          toast('Archivage reussi', {type:"success"})
        }).catch((error) => {
          console.error("Erreur lors de l'archivage du cours :", error);
        });
      };

     const styleArticles = (title) =>{
        if (title === 'Programmation') {
           return {
             backgroundColor:'#fee7ef'
    
           }
           
        } else if(title=== 'Cinema'){
           return{
             backgroundColor :'#e7fbfc'
    
           }
           
        }
        else if(title=== 'Website Design'){
            return{
              backgroundColor :'#eae7f8'
     
            }
            
         }
         else if(title=== 'Logo Design'){
            return{
              backgroundColor :'#ffe3d5'
     
            }
            
         } else{
            return{
                backgroundColor :'#e7fbfc'
       
              }
         }
         
    }

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

useEffect(() => {
  const coursRef = collection(db, 'Courses');
  let q = coursRef;

  if (searchTerm) {
    q = query(
      coursRef,
      where('title', '>=', searchTerm)
    );
  } else {
    q = query(
      coursRef,
      orderBy('lesson', 'desc')
    );
  }

  onSnapshot(q, (snapshot) => {
    const cours = snapshot.docs
      .filter((doc) => doc.data().lesson > 100)
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    setCours(cours);
  });
}, [searchTerm]);








  return (
    <div style={{borderRadius:'50px'}}>
    <div className='entete position-relative'>
        <input type="search" placeholder='What do you want to learn ?' value={searchTerm}
          onChange={handleSearchChange}  />
        <SearchIcon 
        style={{position:'absolute', left:'72%', top:'14%', fontSize:'30px', color:'grey'}}
        />

       
        <button  className='btn btn-primary boutton'>Study now</button>
    </div>
     <div className="d-flex w-100 mb-3 ">
        <h2 className='fw-bold'>  Popular Courses </h2>
        <div className='viewAll'>
          <Link to='/articles'>
          <span style={{ cursor: 'pointer' }} >
           view all
          </span>
          </Link>
        </div>
     </div>
    {
        cours.length === 0 ? (
            <p>No article find</p>
        ) : (
             
             
            cours.map(({id, title, imageUrl, createdAt, lesson, archived}) =>( 
               
                  <div className="border  rounded-2  mb-3" 
                style={{
                    width:'100%',
                    height:'100px',
                   ...styleArticles(title)
                }} key={id}>
                   <div className="row">                        
                       <div className="col-md-3 d-flex justify-content-center align-items-center ">
                           <Link to={`/article/${id}`}>
                               <img src={imageUrl} className='img-fluid rounded-3 ' style={{width:'100px' , height: '70px'}} alt=""  />
                           </Link>
                       </div>
                       <div className="col-md-7 d-flex flex-column  p-1">
                                <div className='d-flex '>
                                    <h4>{title}</h4>
                                </div>
                         {/* createdAt */}
                         
                            <span>{createdAt.toDate().toDateString()}</span>
                         {/* description */}
                            <span>{lesson} Lesson</span>
                            
                            
                            </div>
                            <div className="col-md-2 ">
                              <DeleteButton/>
                             <Link to={`/article/${id}`}>
                              <span className='detail'>Details</span>
                             </Link> <br />
                             {/* <Link to={`/editCours/${id}`}>
                              <span className='text-decoration-none'>Editer</span>
                             </Link> */}
                            </div>
                       </div>
                    </div>
                
               
            ))
        )
    }
    <Link to='/addArticle'>
                 <button className='btn btn-success' style={{cursor:'pointer'}} >AddArt</button>  
    </Link>
</div>
  )
}

export default PopularCours