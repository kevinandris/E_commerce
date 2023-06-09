// ! 12 -- parent
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import filterReducer from "./slice/filterSlice"
import cartReducer from "./slice/cartSlice"
import checkoutReducer from "./slice/checkoutSlice"
import orderReducer from "./slice/orderSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer
})

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => // * remove the warnings on console
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default Store