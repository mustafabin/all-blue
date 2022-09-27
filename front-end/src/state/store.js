import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.js";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});
