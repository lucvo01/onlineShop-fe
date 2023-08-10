import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  subtotal: localStorage.getItem("subtotal")
    ? JSON.parse(localStorage.getItem("subtotal"))
    : 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          quantity: state.products[existingIndex].quantity + 1
        };
      } else {
        let item = { ...action.payload, quantity: 1 };
        state.products.push(item);
      }
      toast.success("Product added to cart", {
        position: "bottom-left"
      });
      localStorage.setItem("products", JSON.stringify(state.products));
      // console.log("items", state.products);
    },
    decreaseItem: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        toast.success("Decrease product success", {
          position: "bottom-left"
        });
      } else if (state.products[itemIndex].quantity === 1) {
        state.products = state.products.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error("Product removed from cart", {
          position: "bottom-left"
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("products", JSON.stringify(state.products));
      toast.success("Remove product success", {
        position: "bottom-left"
      });
    },

    clearCart: (state, action) => {
      state.products = [];
      state.subtotal = 0;
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("subtotal", JSON.stringify(state.products));
    },

    getSubtotal: (state, action) => {
      let subtotal = 0;

      state.products.forEach((item) => {
        item.itemTotal = item.quantity * item.price;
        subtotal += item.itemTotal;
      });
      state.subtotal = subtotal.toFixed(2);
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("subtotal", JSON.stringify(state.subtotal));
    },

    addShippingAddress: (state, action) => {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.products));
    }
  }
});
export const {
  addToCart,
  decreaseItem,
  removeItem,
  clearCart,
  getSubtotal,
  addShippingAddress
} = cartSlice.actions;

export default cartSlice.reducer;
