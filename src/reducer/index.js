import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";


const rootReducer = combineReducers({
  // Add your reducers here
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,

});

export default rootReducer;