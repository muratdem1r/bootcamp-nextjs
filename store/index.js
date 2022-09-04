import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "../features/auth/authSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
    },
  });

export const wrapper = createWrapper(makeStore);
