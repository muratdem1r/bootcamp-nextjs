import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  isLoggedIn: false,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.name;
      state.email = action.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
