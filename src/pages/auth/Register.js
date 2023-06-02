// ! 7
import React, { useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import registerImg from "../../assets/register.png"
import { Link } from 'react-router-dom'
import {toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import Loader  from "../../components/loader/Loader"
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const registerUser = (e) => {

        // it doesn't reload the page upon every submission
        e.preventDefault()

        // To check if password is not matched with cPassword
        if (password !== cPassword) {
            toast.error("Passwords do not match.")
            setIsLoading(false)
        } else {
    
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user) /* see user credentials */
                setIsLoading(false) /* loading back to false */
    
                toast.success("Registration successful...")
                navigate("/login")
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false) /* loading back to false */
            });
        }
    }

    return (
        <>
            {isLoading && <Loader/>}

            <section className={`container ${styles.auth}`}>

                {/* form property*/}
                <Card>
                    <div className={styles.form}>
                        
                        <h2>Register</h2>

                        <form onSubmit={registerUser}>
                            <input 
                                type="text" 
                                placeholder='Email' 
                                required value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input 
                                type="password" 
                                placeholder='Password' 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input 
                                type="password" 
                                placeholder='Confirm Password' 
                                required 
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />

                            <button type='submit' className="--btn --btn-primary --btn-block">Register</button>
                        </form>

                        <span className={styles.register}>
                            <p>
                                Already have an account?
                            </p>
                            <Link to="/login">Login</Link>
                        </span>

                    </div>
                </Card>

                {/* image property */}
                <div className={styles.img}>
                    <img src={registerImg} alt="Login" width={400}/>
                </div>

            </section>
        </>
    ) 
}

export default Register