import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import currentUserSlice from "./slices/currentUserSlice";
import darkModeSlice from "./slices/darkModeSlice";
import { rootApi } from "../services/rootApi";

const makeStore = () =>
  configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
      currentUser: currentUserSlice,
      darkMode: darkModeSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApi.middleware),
  });

export const wrapper = createWrapper(makeStore);
