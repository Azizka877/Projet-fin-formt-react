import React from 'react'
import image from '../Images/images (1).jpg'

function About() {
  return (
    <>
        <div className="d-flex mb-4 ms-4 mt-5">
            <img src={image} className='img-fluid' style={{width:'80px', borderRadius:"15px"}} alt="" />
            <div className='d-flex flex-column ms-2  mt-3'>
                <span>Francois</span>
                <span>⭐⭐⭐⭐</span>
            </div>

        </div>
        <span className='fw-bold fs-4 ms-4'>About Teacher</span>
    </>
  )
}

export default About