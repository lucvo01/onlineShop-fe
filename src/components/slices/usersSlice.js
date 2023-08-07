import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  users: []
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    }
  }
});

export default slice.reducer;

export const updateUserProfile =
  ({ userId, ...data }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const info = {
        ...data
        // name,
        // address,
        // phone,
        // password,
        // isDeleted
      };
      const response = await apiService.put(`/users/${userId}`, info);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getAllUsers = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users`);
    dispatch(slice.actions.getAllUsersSuccess(response.data.data.users));
    // console.log(response.data.data);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// export const deleteUser = () => async (dispatch) => {
//   dispatch(slice.actions.startLoading())
//    try {
//      const response = await apiService.put(`/users/${userId}`, data);
//     dispatch(slice.actions.updateUserProfileSuccess(response.data));
//   } catch (error) {
//     dispatch(slice.actions.hasError(error));
//   }
// }


