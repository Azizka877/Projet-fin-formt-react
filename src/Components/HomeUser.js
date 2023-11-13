import React from 'react'
import Calendar from 'react-calendar';
import Logo from '../Images/logo.jpg';
import '../App.css';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddchartIcon from '@mui/icons-material/Addchart';
import ARTICLES from './User/ARTICLES';

const HomeUser = () => {



  

  return (
    <div className='container border border-2 rounded-2' style={{borderColor:'black '}}>
        <div className="row">
      <div className="col-md-1 menu">
        <img src={Logo} className='img-fluid mb-3' alt="" />
         <div className='d-flex justify-content-center align-items-center flex-column'>
         <AppsIcon className='mb-3' style={{color:'skyblue'}}/>
         <CalendarMonthIcon className='mb-3' style={{color:'skyblue'}}/>
         <AddchartIcon className='mb-3' style={{color:'skyblue'}}/>
         <SettingsIcon style={{color:'skyblue'}}/>

         </div>
      </div>
      <div className="col-md-8 articles   ">
        <ARTICLES/>
        <div className='d-flex mt-5 mb-3'>   
        </div>
      </div>
      <div className="col-md-3  ">
          <Calendar/>
         
      </div>
     </div>
    </div>
  )
}

export default HomeUser