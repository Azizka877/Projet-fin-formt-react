import React, { useState } from 'react'
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddchartIcon from '@mui/icons-material/Addchart';
import Logo from '../Images/logo.jpg';
import './Menu.css'
import { Link } from 'react-router-dom';

function Menu() {
const [activatedIcon, setActivatedIcon] = useState(null)
    const activateIcon = (AppsIcon) => {
        setActivatedIcon(AppsIcon);
      };
    
  return (
    
        <div className=" menu">
        <img src={Logo} className='img-fluid mb-3' alt="" />
         <div className='d-flex justify-content-center align-items-center flex-column'>
            <Link to='/'>
              <AppsIcon    className={`mb-3 ${activatedIcon === 'AppsIcon' ? 'active-icon' : ''}`}
               style={{ color: 'skyblue' }}
              onClick={() => activateIcon('AppsIcon')}/>
          </Link>
          <Link to='/articles'>
         <CalendarMonthIcon  style={{color:'skyblue'}}   className={`mb-3 ${activatedIcon === 'CalendarMonthIcon' ? 'active-icon' : ''}`}
         onClick={() => activateIcon('CalendarMonthIcon')}
         />
         </Link>
         <AddchartIcon   className={`mb-3 ${activatedIcon === 'AddchartIcon' ? 'active-icon' : ''}`} style={{color:'skyblue'}}
         onClick={() => activateIcon('AddchartIcon')}
         />
         <SettingsIcon onClick={() => activateIcon('SettingsIcon')}   className={`mb-3 ${activatedIcon === 'SettingsIcon' ? 'active-icon' : ''}`} style={{color:'skyblue'}}/>

         </div>
    </div>
  )
}

export default Menu