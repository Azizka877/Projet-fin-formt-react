import {  collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


const ARTICLES = () => {
   
          const [cours, setCours] = useState([]);
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


  return (
    <div style={{borderRadius:'50px'}}>
    <div className='entete position-relative'>
        <input type="search" placeholder='What do you want to learn ?'  />
        <SearchIcon 
        style={{position:'absolute', left:'72%', top:'14%', fontSize:'30px', color:'grey'}}
        />
        <button  className='btn btn-primary boutton'>Study now</button>
    </div>
     <div className="d-flex w-100 mb-3 ">
        <h2 className='fw-bold'>  Popular Courses </h2>
        <div className='viewAll'>
         <Link to='/articles'> 
             <span >View all</span> 
         </Link>
        </div>
     </div>
    {
        cours.length === 0 ? (
            <p>No article find</p>
        ) : (
             
             
            cours.map(({id, title, imageUrl, createdAt, lesson}) =>( 
                <div className="border rounded-2  mb-3" 
                style={{
                    height:'100px',
                  ...styleArticles(title)
                
                }} key={id}>
                   <div className="row">                        
                       <div className="col-md-3 d-flex justify-content-center align-items-center">
                           <Link to={`/view/${id}`}>
                               <img src={imageUrl} className='img-fluid ' style={{width:'100px' , height: '70px'}} alt=""  />
                           </Link>
                       </div>
                       <div className="col-md-9 d-flex flex-column p-1">
                                <div className='d-flex '>
                                    <h4>{title}</h4>
                                </div>
                         {/* createdAt */}
                         
                            <span>{createdAt.toDate().toDateString()}</span>
                         {/* description */}
                            <span>{lesson} Lesson</span>
                            
                            </div>
                           
                       </div>
                    </div>
               
            ))
        )
    }
</div>
  )
}

export default ARTICLES