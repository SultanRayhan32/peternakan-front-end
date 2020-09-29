// MODULES
import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './style.css'

// ICON
// import IconProfile from '../../Images/Profile/profile.png'
// import Bell from '../../Images/Profile/bell.png'

export default function Navbar() {
    return (
        <div className='navbar-container'>
            
            {/* <div className="nav-profile-icon" style={{ marginRight: '10px' }}>
                <Link>
                    <img 
                        src={Bell} 
                        alt="profile-icon"
                        className='profile-icon'
                        />
                </Link>
            </div> */}
            {/* <div className='nav-profile-icon' style={{ marginRight: '20px' }}>
                <Link to='/profile'>
                    <img 
                        src={IconProfile} 
                        alt="profile-icon"
                        className='profile-icon'
                        />
                </Link>
            </div> */}
        </div>
    )
}
