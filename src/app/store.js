import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../components/slices/cartSlice";
import productsReducer from "../components/slices/productsSlice";
import ordersReducer from "../components/slices/ordersSlice";
import usersReducer from "../components/slices/usersSlice";
import genderReducer from "../components/slices/genderSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: ordersReducer,
  users: usersReducer,
  gender: genderReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
