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
      console.log("addtocart", action.payload);
      // const { product, size } = action.payload;
      console.log("addtocart _id", action.payload._id);
      const existingIndex = state.products.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          quantity: state.products[existingIndex].quantity + 1
        };
      } else {
        let newItem = { ...action.payload, quantity: 1 };
        state.products.push(newItem);
      }
      toast.success("Product added to cart", {
        position: "bottom-left"
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    removeItem: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      const updatedProducts = state.products.slice();
      updatedProducts.splice(itemIndex, 1);

      state.products = updatedProducts;
      localStorage.setItem("products", JSON.stringify(state.products));
      toast.success("Remove product success", {
        position: "bottom-left"
      });
    },

    decreaseItem: (state, action) => {
      console.log("decrease", action.payload);
      const itemIndex = state.products.findIndex(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        toast.success("Decrease product success", {
          position: "bottom-left"
        });
      } else if (state.products[itemIndex].quantity === 1) {
        const updatedProducts = state.products.slice();
        updatedProducts.splice(itemIndex, 1);

        state.products = updatedProducts;

        toast.error("Product removed from cart", {
          position: "bottom-left"
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
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
