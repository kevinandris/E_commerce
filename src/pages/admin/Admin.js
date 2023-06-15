// ! 16 (PARENT)
import React from 'react'
import styles from "./Admin.module.scss"
import Navbar from '../../components/admin/navbar/Navbar'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProduct from '../../components/admin/addProduct/AddProduct'
import Orders from '../../components/admin/orders/Orders'
import { Routes, Route } from 'react-router-dom'
import Home  from '../../components/admin/home/Home'

const Admin = () => {
  return (
    <div className={styles.admin}>

      {/* ! NAVBAR SIDE */}
      <div className={styles.navbar}>
        <Navbar />
      </div>

       {/* ! CONTENT SIDE */}
      <div className={styles.content}>
        <Routes>
          <Route path="home"  element={<Home/> }/>
          <Route path="all-products"  element={<ViewProducts/> }/>
          <Route path="add-product/:id"  element={<AddProduct/> }/>
          <Route path="orders"  element={<Orders/> }/>
        </Routes>
      </div>

    </div>
  )
}

export default Admin