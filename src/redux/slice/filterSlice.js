// ! 27 - child - rxslice to create
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
        const { products, search } = action.payload
        const tempProducts = products.filter((product) => 
        product.name.toLowerCase().includes(search.toLowerCase()) 
        || 
        product.category.toLowerCase().includes(search.toLowerCase()) )

        state.filteredProducts = tempProducts;
    },
  }
});

export const {FILTER_BY_SEARCH} = FilterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProducts

export default FilterSlice.reducer