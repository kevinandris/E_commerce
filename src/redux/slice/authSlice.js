// ! 11 -- rxslice to create the structure -- child

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // actions -- we can access  whether a user is logged in or not
    // from any components from our page and we can also access user information.

    SET_ACTIVE_USER: (state, action) => {
        console.log(action.payload);
        
        const {email, userName, userID} = action.payload;
        
        state.isLoggedIn = true;
        state.email = email;
        state.userName = userName;
        state.userID = userID;
    },

    // remove the active user
    REMOVE_ACTIVE_USER: (state, action) => {
        state.isLoggedIn = false;
        state.email = null;
        state.userName = null;
        state.userID = null;
    },
  },
});


export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions
// auth slice
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer