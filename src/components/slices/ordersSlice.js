import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCTS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  totalPages: null
};

const ordersSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      console.log("start loading");
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetOrders(state, action) {
      state.currentPageProducts = [];
    },
    getOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.orders;
      state.totalPages = action.payload.totalPages;
    },
    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("set state", state, action);
      // const newOrder = action.payload;
      // state.orders = state.orders.push(newOrder);
    },
    editOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newOrder = action.payload;
      state.orders.forEach((order) => {
        if ((order._id = newOrder._id)) order = newOrder;
      });
    }
  }
});

export default ordersSlice.reducer;

export const getOrders =
  ({ pageNum, limit = PRODUCTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      // const params = { pageNum, limit };
      const response = await apiService.get(
        `/orders?page=${pageNum}&limit=${limit}`
      );
      dispatch(ordersSlice.actions.getOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createOrder =
  ({ userId, shipping, subtotal, products, payment_status }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      const response = await apiService.post("/orders", {
        userId,
        shipping,
        subtotal,
        products,
        payment_status
      });
      dispatch(ordersSlice.actions.createOrderSuccess(response.data));
      toast.success("Create Order successfully");
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteOrder = (productId) => async (dispatch) => {
  dispatch(ordersSlice.actions.startLoading());
  try {
    console.log("id", productId);
    await apiService.put(`/products/${productId}/delete`);
    toast.success("Delete Order successfully");
    dispatch(getOrders());
  } catch (error) {
    dispatch(ordersSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editOrder =
  ({ values, orderId }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      // upload image to cloudinary
      await apiService.put(`/orders/${orderId}/edit`, {
        values
      });
      toast.success("Edit Order successfully");
      dispatch(getOrders());
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
