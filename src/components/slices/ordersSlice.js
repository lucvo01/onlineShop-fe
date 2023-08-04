import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCTS_PER_PAGE } from "../../app/config";
import { clearCart } from "./cartSlice";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  totalPages: 1
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
    createOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("set state", state, action);
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
  ({ pageNum, limit = PRODUCTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/orders?page=${pageNum}&limit=${limit}`
      );
      console.log("getOrders", response);
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
      console.log("getSingleOrder", response);
      // dispatch(ordersSlice.actions.getOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(ordersSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createOrder =
  ({ userId, products, subtotal, ...data }) =>
  async (dispatch) => {
    dispatch(ordersSlice.actions.startLoading());
    try {
      console.log(userId);
      const response = await apiService.post("/orders", {
        ...data,
        userId,
        products,
        subtotal
      });
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
    console.log("id", orderId);
    await apiService.put(`/orders/${orderId}/delete`);
    toast.success("Delete Order successfully");
    dispatch(getOrders());
  } catch (error) {
    dispatch(ordersSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

// export const editOrder =
//   ({ ...values, orderId }) =>
//   async (dispatch) => {
//     dispatch(ordersSlice.actions.startLoading());
//     try {
//       await apiService.put(`/orders/${orderId}/edit`, {
//         ...values
//       });
//       toast.success("Edit Order successfully");
//       dispatch(getOrders());
//     } catch (error) {
//       dispatch(ordersSlice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
//   };
