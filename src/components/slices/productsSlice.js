import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  productsById: {},
  currentPageProducts: []
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetProducts(state, action) {
      state.productsById = {};
      state.currentPageProducts = [];
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { products, count } = action.payload;
      products.forEach((product) => {
        state.productsById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id))
          state.currentPageProducts.push(product._id);
      });
      state.totalProducts = count;
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;
      if (state.currentPageProducts.length % PRODUCTS_PER_PAGE === 0)
        state.currentPageProducts.pop();
      state.productsById[newProduct._id] = newProduct;
      state.currentPageProducts.unshift(newProduct._id);
    },
    editProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { productId } = action.payload;
      state.productsById[productId] = action.payload;
    }
  }
});

export default slice.reducer;

export const getProducts =
  ({page = 1, limit = PRODUCTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(
        `/products?page=${page}&limit=${limit}`,
        {
          params
        }
      );
      // if (page === 1) dispatch(slice.actions.resetProducts());
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createProduct =
  ({ values, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.Product("/Products", {
        values,
        image: imageUrl
      });
      dispatch(slice.actions.createProductSuccess(response.data));
      toast.success("Product successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteProduct =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.put(`/products/${productId}/delete`);
      toast.success("Delete successfully");
      dispatch(getProducts());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const editProduct =
  ({  productId, name, description, price, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      await apiService.put(`/products/${productId}/edit`, {
        name, description, price,
        image: imageUrl
      });
      toast.success("Edit successfully");
      dispatch(getProducts());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
