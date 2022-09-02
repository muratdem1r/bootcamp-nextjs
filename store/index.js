import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "../features/currentUser/currentUserSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
});
