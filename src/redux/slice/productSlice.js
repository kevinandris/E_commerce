// ! 19 -- rxslice to create the structure (Child)
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
        // console.log(action.payload)
        state.products = action.payload.products // save the information of list of products in our redux state and can be accessed anywhere in our app
    },

    GET_PRICE_RANGE(state, action) {
      // console.log(action.payload);
      const { products } = action.payload
      const array = []
      products.map((product) => {
        const price = product.price
        return array.push(price)
      });
      // console.log(array)

      const max = Math.max(...array)
      const min = Math.min(...array)
      // console.log(max, min)

      state.minPrice = min
      state.maxPrice = max
    }
  }
});


export const { STORE_PRODUCTS, GET_PRICE_RANGE } = productSlice.actions

export const selectProducts = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice

export default productSlice.reducer