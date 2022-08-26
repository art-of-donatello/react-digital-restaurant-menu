import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
name: "user",
initialState: {
    user: null,
    role: null,
    email: null,
},
reducers:{
    login: (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.email = action.payload.email;
    },
    logout: (state) => {
        state.user = null;
        state.role = null;
        state.email = null;
    },
    auth: (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.email = action.payload.email;
    },
}


})

export const loginState = state => state.user;


export const { login, logout, auth } = UserSlice.actions;


export default UserSlice.reducer;