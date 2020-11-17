// MODULES
import React , { useState} from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

// CSS
import './style.css'

// IMAGE
import Burger from '../../Images/navbar/burger-navbar.png'

function Navbar() {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' })

    const [isBurgerClick,setIsBurgerClick] = useState(false)

    return (
        <div 
            className='navbar-container'
            style={{
                height : isTabletOrMobile && isBurgerClick ? "220px" : null,
            }}
        >
            
            {
                isTabletOrMobile ?
                <div>
                    <img 
                        src={Burger} 
                        className="burger-navbar-menu"
                        onClick={e=>setIsBurgerClick(!isBurgerClick)}
                    />
                </div>
                :<></>
            }

            {
                isTabletOrMobile && isBurgerClick &&
                <div className="burger-menu-content">
                    <div className="burger-menu-content-item">Menu</div>
                    <div className="burger-menu-content-item">Menu</div>
                    <div className="burger-menu-content-item">Menu</div>
                    <div className="burger-menu-content-item">Menu</div>
                </div>
            }


            
        </div>
    )
}

export default Navbar;











































































// ICON
// import IconProfile from '../../Images/Profile/profile.png'
// import Bell from '../../Images/Profile/bell.png'


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