import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([userApi.middleware]),
});

export default store;
