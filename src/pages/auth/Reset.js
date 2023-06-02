// ! 8
import React, { useState } from 'react'
import resetImg from '../../assets/forgot.png'
import Card from '../../components/card/Card'
import styles from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const Reset = () => {

    const [email, setEmail ] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()

    const resetPassword = (e) => {
        e.preventDefault(); 
        setIsLoading(true)

        alert(email);

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setIsLoading(false)
            toast.success("Check your email for a reset link")

            navigate("/")
        })
        .catch((error) => {
            setIsLoading(false)
            toast.error(error.message)
        });
    }
     
    return (
        <>
            {/* if the page is loading, display the loader on the screen */}
            {isLoading && <Loader/>}

            <section className={`container ${styles.auth}`}>

                {/* image property */}
                <div className={styles.img}>
                    <img src={resetImg} alt="Reset Password" width={400}/>
                </div>

                {/* form property*/}
                <Card>
                    <div className={styles.form}>
                        
                        <h2>Reset Password</h2>

                        <form onSubmit={resetPassword}>
                            <input 
                                type="text" 
                                placeholder='Email' 
                                required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button type='submit' className="--btn --btn-primary --btn-block">Reset password</button>

                            {/* Links */}
                            <div className={styles.links}>
                                <p>
                                    <Link to="/login">- Login</Link>
                                </p>

                                <p>
                                    <Link to="/register">- Register</Link>
                                </p>
                            </div>

                        </form>

                    </div>
                </Card>

            </section>
        </>
  )
}

export default Reset