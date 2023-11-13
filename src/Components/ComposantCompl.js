import React, { useContext } from 'react'
import { MyContext } from './MyContext'

function ComposantCompl({completedCoursesCount}) {
  console.log(completedCoursesCount);
  return (
   
      
              
            <div className="container overflow-hiden   mt-5 ">
            <div className="row gy-4 gx-3  ">
       <div className="col-md-6   d-flex flex-column me-3 "
       style={{background:'#dedffe', width:'47%', height:'120px',borderRadius:'15px'}}
       >
         <span>Completes Courses</span>
         <span className='fw-bold fs-5 mt-4' style={{color:'#6353c1'}}>{completedCoursesCount}</span>
       </div>
       <div className="col-md-6  d-flex flex-column "
       style={{background:'#ffe8f2', width:'47%', height:'120px',borderRadius:'15px'}}
       >
         <span >Onlines Webinaires</span>
         <span className='fw-bold mt-4 fs-5' style={{color:'#b83e73'}}>56</span>
       </div>
       
    
       <div className="col-md-6 d-flex flex-column me-3"
       style={{background:'#ffe3d5', width:'47%', height:'120px' , borderRadius:'15px'}}
       >
           <span>Teachers Reviews</span>
           <span className='fw-bold mt-5 fs-5' style={{color:'#f2803f'}}>13</span>
       </div>
       <div className="col-md-6 d-flex flex-column "
       style={{background:'#e7fbfc', width:'47%', height:'120px', borderRadius:'15px'}}
       >
           <span>Courses in Progress</span>
           <span className='fw-bold mt-4 fs-5' style={{color:'#2d8b8c'}}>34</span>
       </div>
    </div>
       </div>
       
  )
}

export default ComposantCompl