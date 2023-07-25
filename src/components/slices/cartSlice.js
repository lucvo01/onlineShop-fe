import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'

const initialState = {
 cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducer: {
      addItem(state, action) {
             const existingIndex = state.cartItems.findIndex(
               (item) => item._id === action.payload._id
             );

              if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                  ...state.cartItems[existingIndex],
                  cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
                };
                toast.info("Increased product quantity", {
                  position: "bottom-left"
                });
              } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                toast.success("Product added to cart", {
                  position: "bottom-left"
                });
              }
              localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
              );
      },
      decreaseItem(state, action) {
        const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id)

        if(state.cartItems[itemIndex].cartQuantity > 1){
          state.cartItems[itemIndex].cartQuantity -= 1
        } else if(state.cartItems[itemIndex].cartQuantity === 1){
         state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
        }
toast.success("Decrease item success", {
  position: "bottom-left"
});
      }
    }
})

export default cartSlice.reducer;