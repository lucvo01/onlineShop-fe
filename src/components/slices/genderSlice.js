import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  gender: null
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload
      console.log(action.payload);
      }
    }
});

export const { setGender } = genderSlice.actions

export default genderSlice.reducer;


