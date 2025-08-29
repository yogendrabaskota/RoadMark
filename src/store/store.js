import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import potholeSlice from "./potholeSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    pothole: potholeSlice,
  },
});

export default store;
