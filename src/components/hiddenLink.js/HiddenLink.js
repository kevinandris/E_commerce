// ! 13 -- child
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

// display the menu only when a user is logged in
const ShowOnLogin = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return children
    }
    
    return null;
}

// remove the login on header only when a user is logged in
export const ShowOnLogout = ({children}) => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return children
    }
    
    return null;
}

export default ShowOnLogin