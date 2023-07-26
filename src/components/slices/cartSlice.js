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
    },
    decreaseItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success("Decrease product success", {
          position: "bottom-left"
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error("Product removed from cart", {
          position: "bottom-left"
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    }
  }
});

export const { addToCart, decreaseItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
