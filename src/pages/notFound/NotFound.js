// ! 47
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'
import React from 'react'

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
        <div>
            <h2>404</h2>
            <p>Oooppppssss, Page not found.</p>
            <button className='--btn'>
                <Link to="/">
                    &larr; Back To Home
                </Link>
            </button>
        </div>
    </div>
  )
}

export default NotFound