// ! 3 -- child
// ! Redux allows us to access auth state from different points of your app (any components)

import React, { useEffect, useState } from 'react'
import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { auth } from '../../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink.js/HiddenLink'


const logo = (
  <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20}/>
      <p>0</p>
    </Link>
  </span>
)

const activeLink = ({isActive}) => 
(isActive ? `${styles.active}` : "")

const Header = () => {

  // variables declarations
  const [showMenu, setShowMenu] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()

  // Redux
  const dispatch = useDispatch()

  // Monitor currently signed in user using "useEffect"
  useEffect (() => {

    // from firebase
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user)

        // In case user's name is not exist
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@")) /* cut characters from "@ symbol" */
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1) /* make the first letter an upper case */
          // console.log(uName);
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName)
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        )
      } else {
        setDisplayName('');

        // remove the active users
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]) 

  // open menu function
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  // close menu function
  const hideMenu = () => {
    setShowMenu(false)
  }

  // logoutUser function
  const logoutUser = () => {
    signOut(auth).then(() => {
      // TOAST
      toast.success("Logout successfully...")

      /* send user to home page */
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  
  return (
    <>
      <header>
        <div className={styles.header}>

          {logo}

          <nav className={showMenu ? 
            `${styles["show-nav"]}`
          : `${styles["hide-nav"]}`}>

            <div className={showMenu ? 
              `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` 
            : `${styles["nav-wrapper"]}`
            }

            onClick={hideMenu}
            ></div>

              <ul onClick={hideMenu}>
                <li className={styles["logo-mobile"]}>
                  {logo}
                  <FaTimes size={22} color="#fff" onClick={hideMenu} />
                </li>

                <li>
                    <NavLink to="/" className={activeLink}>
                    Home
                    </NavLink>
                </li>
                
                <li>
                  <NavLink to="/contact" className={activeLink}>
                    Contact Us
                  </NavLink>
                </li>
              </ul>

              <div className={styles["header-right"]} onClick={hideMenu}>
                <span className={styles.links}>

                  <ShowOnLogout>
                    <NavLink to="/login" className={activeLink}>Login</NavLink>
                  </ShowOnLogout>

                  <ShowOnLogin>
                    <a href="#home" style={{color: "#ff7722"}}>
                      <FaUserCircle size={16}/>
                      Hi, {displayName}
                    </a>
                  </ShowOnLogin>

                  <ShowOnLogin>
                    <NavLink to="/orderHistory" className={activeLink}>My Orders</NavLink>
                  </ShowOnLogin>

                  <ShowOnLogin>
                    <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
                  </ShowOnLogin>
                  
                </span>

                {cart}
              
              </div>

          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
          </div>  

        </div>
      </header>
    </>
  )
}

export default Header;