import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCurrentUser, logout } = currentUserSlice.actions;

export default currentUserSlice.reducer;
