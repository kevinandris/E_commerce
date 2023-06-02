// ! 12 -- parent
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"

const rootReducer = combineReducers({
    auth: authReducer,
})

const Store = configureStore({
    reducer: rootReducer, 
})

export default Store