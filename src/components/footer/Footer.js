// ! 4 -- child
import React from 'react'
import styles from './Footer.module.scss'

const date = new Date() // accessing date function
const year = date.getFullYear() // get current year

const Footer = () => {
  return (
    <>
     <div className={styles.footer}>
      &copy; {year} All Rights Reserved
     </div> 
    </>
  )
}

export default Footer