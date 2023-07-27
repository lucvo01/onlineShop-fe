import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../components/slices/cartSlice";
import productsReducer from "../components/slices/productsSlice";
// import ordersReducer from "../components/slices/ordersSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
