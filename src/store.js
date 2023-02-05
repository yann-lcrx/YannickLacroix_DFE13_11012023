import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import authReducer from "./features/auth";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});
