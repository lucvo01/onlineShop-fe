import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  category: null
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
      console.log(action.payload);
      }
    }
});

export const { setCategory } = categorySlice.actions

export default categorySlice.reducer;


