// ! 5
import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/card/Card'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader/Loader'

const Login = () => {

    // * Variables declarations
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    //  ! function 1
    const loginUser = (e) => {
        // preventing the reload of the page
        e.preventDefault()

        setIsLoading(true)

        // from firebase 
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // const user = userCredential.user;

            setIsLoading(false) //  * stop the loading 
            toast.success("Login Successful...")  // * success message from TOAST
            navigate("/") // * direct user to homepage
        })
        .catch((error) => {
            setIsLoading(false) // * stop the loading 
            toast.error(error.message) // * error message using toast
        });
    } // close loginUser function

    // Login with Google (from firebase)
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = (e) => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // const user = result.user;

            // Toast
            toast.success("Login Successfully...")

            navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        });
    } // close loginUser function

    return (
        <>
            {isLoading && <Loader/>}

            <section className={`container ${styles.auth}`}>

                {/* image property */}
                <div className={styles.img}>
                    <img src={loginImg} alt="Login" width={400}/>
                </div>

                {/* Card property*/}
                <Card>
                    <div className={styles.form}>
                        
                        <h2>Login</h2>
                        
                        {/* FORM PROPERTIES */}
                        <form onSubmit={loginUser}>
                            <input 
                                type="text" 
                                placeholder='Email'
                                required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input 
                                type="password" 
                                placeholder='Password' 
                                required
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}  
                            />

                            <button className="--btn --btn-primary --btn-block">Login</button>

                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>

                            <p>-- or --</p>
                        </form>

                        <button type='submit' className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}> <FaGoogle color="#fff"/> Login With Google</button>

                        <span className={styles.register}>
                            <p>
                                Don't have an account? 
                            </p>
                            <Link to="/register"> Register</Link>
                        </span>

                    </div>
                </Card>

            </section>
        </>
    )
}

export default Login