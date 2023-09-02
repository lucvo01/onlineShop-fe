import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCTS_PER_PAGE } from "../../app/config";
import { clearCart } from "./cartSlice";

const initialState = {
  isLoading: false,
  error: null,
  orders: [
    {
      productId: null,
      quantity: 1
    }
  ],
  totalPages: 1,
  currentOrder: {},
  pageNum: 1
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    startLoading(state) {
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
    getCurrentOrder(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentOrder = action.payload;
    },
    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newOrder = action.payload;
      state.orders = [...state.orders, newOrder];
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
  ({ pageNum, limit = PRODUCTS_PER_PAGE, delivery_status }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      const params = { page: pageNum, limit };
      if (delivery_status) params.delivery_status = delivery_status;

      const response = await apiService.get("/orders", { params });
      dispatch(ordersSlice.actions.getOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleUserOrders =
  ({ userId }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/orders/find/${userId}`);
      dispatch(ordersSlice.actions.getOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getAnOrder =
  ({ orderId }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/orders/${orderId}`);

      dispatch(ordersSlice.actions.getCurrentOrder(response.data.data));
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createOrder =
  ({ response }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      dispatch(ordersSlice.actions.createOrderSuccess(response.data.data));
      dispatch(clearCart());
      toast.success("Create Order successfully");
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch(ordersSlice.actions.startLoading());
  try {
    // console.log("id", orderId);
    await apiService.put(`/orders/${orderId}/delete`);
    toast.success("Delete Order successfully");
    dispatch(getOrders());
  } catch (error) {
    dispatch(ordersSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editOrder =
  ({ orderId, pageNum, ...data }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      await apiService.put(`/orders/${orderId}`, {
        ...data
      });
      toast.success("Edit Order successfully");
      dispatch(getOrders({ pageNum }));
    } catch (error) {
      console.log("editOrder", error);
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
