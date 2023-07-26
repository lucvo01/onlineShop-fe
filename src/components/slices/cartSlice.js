import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // Initial state of the cart
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
        };
      } else {
        let item = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(item);
        toast.success("Product added to cart", {
          position: "bottom-left"
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      console.log("items", state.items);
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
