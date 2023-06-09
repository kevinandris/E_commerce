// ! 15 -- Routes only for Admin

import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'

const AdminOnlyRoute = ({children}) => {

    // have access to a user that is currently logged in
    const userEmail = useSelector(selectEmail)
    // console.log(userEmail)
    
    // sensitive information of email
    if (userEmail === "test@gmail.com") {
        return children
    }

    return null
}

export default AdminOnlyRoute