// ! 17 (CHILD)
import React from 'react'
import styles from "./Navbar.module.scss"
import { useSelector } from 'react-redux'
import { selectUserName } from '../../../redux/slice/authSlice'
import { NavLink } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const activeLink = ({isActive}) => (isActive ? `${styles.active}` : "")

const Navbar = () => {
  
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff"/>

        {/* DISPLAY USER"S NAME */}
        <h4>
          {userName}
        </h4>
      </div>

        <nav>
          <ul>

            <li>
              {/* use NavLink to show an active class */}
              <NavLink to="/admin/home" className={activeLink}>
                Home
              </NavLink>

            </li>

            <li>
              {/* use NavLink to show an active class */}
              <NavLink to="/admin/all-products" className={activeLink}>
                All products
              </NavLink>
            </li>

            <li>
              {/* use NavLink to show an active class */}
              <NavLink to="/admin/add-product" className={activeLink}>
                Add products
              </NavLink>
            </li>

            <li>
              {/* use NavLink to show an active class */}
              <NavLink to="/admin/orders" className={activeLink}>
                Orders
              </NavLink>
            </li>

          </ul>
        </nav>
    </div>
  )
}

export default Navbar