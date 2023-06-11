// ! 12 -- parent
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
})

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default Store