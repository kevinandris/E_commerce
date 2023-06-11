// ! 19 -- rxslice to create the structure (Child)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
        // console.log(action.payload)
        state.products = action.payload.products // save the information of list of products in our redux state and can be accessed anywhere in our app
    }
  }
});


export const { STORE_PRODUCTS } = productSlice.actions

export const selectProducts = (state) => state.product.products

export default productSlice.reducer