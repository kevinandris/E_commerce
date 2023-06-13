// ! 29 - rxslice shortcut - child
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems:  localStorage.getItem("cartItems") ? 
    JSON.parse(localStorage.getItem("cartItems")) : [],
    
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
        console.log(action.payload)
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

        if (productIndex >= 0) {
            // * Item already exists in the cart (increase the cart quantity)
            state.cartItems[productIndex].cartQuantity += 1;
            toast.info(`${action.payload.name} increased by one`, {position: "top-left"})

        } else {
            // * Item does not exists in the cart (add item to the cart)
            const tempProduct = {...action.payload, cartQuantity: 1}
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} added to cart`, {position: "top-left"})
        }

        // save cart to LS
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },

  }
});

export const {ADD_TO_CART} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer