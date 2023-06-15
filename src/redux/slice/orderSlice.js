// ! 37
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    totalOrderAmount: null,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
        state.orderHistory = action.payload
    },

    CALCULATE_TOTAL_ORDER_AMOUNT(state, action) {
      const array = []
      state.orderHistory.map((item) => {
        const { orderAmount } = item
        return array.push(orderAmount)
      })
      const orderAmount = array.reduce((a, b) => {
        return a + b
      }, 0); // without 0 we'll get an error (white screen)

      state.totalOrderAmount = orderAmount;
    }
  }
});

export const {STORE_ORDERS, CALCULATE_TOTAL_ORDER_AMOUNT} = orderSlice.actions

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default orderSlice.reducer