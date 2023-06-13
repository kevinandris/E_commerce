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
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink.js/HiddenLink'
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../redux/slice/cartSlice'


const logo = (
  <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
  </div>
)

const activeLink = ({isActive}) => 
(isActive ? `${styles.active}` : "")

const Header = () => {

  // * variables declarations * //
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const navigate = useNavigate()
  const dispatch = useDispatch() // * Redux

  const fixedNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true)
    } else {
      setScrollPage(false)
    }
  };
  window.addEventListener("scroll", fixedNavBar)

  // ! Monitor currently signed in user using "useEffect"
  useEffect (() => { 

    onAuthStateChanged(auth, (user) => { // * from firebase docs
      if (user) {
        // console.log(user)

        if (user.displayName === null) { // * In case user's name is not exist
          const u1 = user.email.substring(0, user.email.indexOf("@")) // * cut characters from "@ symbol"
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1) // * make the first letter an upper case
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

        dispatch(REMOVE_ACTIVE_USER()); // * remove the active users using dispatch function from redux
      }
    });
  }, [dispatch, displayName]) // close useEffect

  // ! function 1
  const toggleMenu = () => { 
    setShowMenu(!showMenu)
  }; // close toggleMenu function

  // ! function 2
  const hideMenu = () => { 
    setShowMenu(false)
  } // close hideMenu function

  // ! function 3
  const logoutUser = () => { 
    signOut(auth).then(() => {
      toast.success("Logout successfully...")  // * TOAST message

      navigate("/")  // * send user to home page
    }).catch((error) => {
      toast.error(error.message)
    });
  } // close logOutUser function

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20}/>
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  )

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [])
  
  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
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

                {/* ! ADMIN BUTTON */}
                <li>
                  <AdminOnlyLink>
                    <Link to="/admin/home">
                      <button className='--btn --btn-primary'>Admin</button>
                    </Link>
                  </AdminOnlyLink>
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

                {cart} {/* DISPLAY THE CART */}
              
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