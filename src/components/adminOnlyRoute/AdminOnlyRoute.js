// ! 15 (child) -- Routes only for Admin

import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice' // js file
import { Link } from 'react-router-dom'

const AdminOnlyRoute = ({children}) => {

    // have access to a user that is currently logged in
    const userEmail = useSelector(selectEmail)
    // console.log(userEmail)
    
    // sensitive information of email to access admin button
    if (userEmail === "test@gmail.com") {
        return children
    }

    return (
        <section style={{height: "80vh"}}>
            <div className="container">
                <h2>Permission Denied</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">

                    <button className='--btn '>&larr; Back To Home</button>
                </Link>
            </div>
        </section>
    )
}

export const AdminOnlyLink = ({children}) => {

    // have access to a user that is currently logged in
    const userEmail = useSelector(selectEmail)
    // console.log(userEmail)
    
    // sensitive information of email to access admin button
    if (userEmail === "test@gmail.com") {
        return children
    }

    return null
}

export default AdminOnlyRoute