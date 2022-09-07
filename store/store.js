import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import currentUserSlice from "./slices/currentUserSlice";

import { bootcampsApi } from "../services/bootcampsApi";
import { coursesApi } from "../services/coursesApi";
import { usersApi } from "../services/usersApi";
import { authApi } from "../services/authApi";

const makeStore = () =>
  configureStore({
    reducer: {
      [bootcampsApi.reducerPath]: bootcampsApi.reducer,
      [coursesApi.reducerPath]: coursesApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      currentUser: currentUserSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        bootcampsApi.middleware,
        coursesApi.middleware,
        usersApi.middleware,
        authApi.middleware
      ),
  });

export const wrapper = createWrapper(makeStore);
