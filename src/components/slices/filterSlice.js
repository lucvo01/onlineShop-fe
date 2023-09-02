import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  gender: "",
  priceRange: []
};

const filterSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    }
  }
});

export const { setGender, setPriceRange } = filterSlice.actions;

export default filterSlice.reducer;
