import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { ProductS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/userSlice";

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
      state.ProductsById = {};
      state.currentPageProducts = [];
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { posts, count } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;
      if (state.currentPageProducts.length % ProductS_PER_PAGE === 0)
        state.currentPageProducts.pop();
      state.ProductsById[newProduct._id] = newProduct;
      state.currentPageProducts.unshift(newProduct._id);
    },
    sendProductReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ProductId, reactions } = action.payload;
      state.ProductsById[ProductId].reactions = reactions;
    },
    editProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ProductId } = action.payload;
      state.ProductsById[ProductId] = action.payload;
    }
  }
});

export default slice.reducer;

export const getProducts =
  ({ userId, page = 1, limit = ProductS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/Products/user/${userId}`, {
        params
      });
      if (page === 1) dispatch(slice.actions.resetProducts());
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createProduct =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.Product("/Products", {
        content,
        image: imageUrl
      });
      dispatch(slice.actions.createProductSuccess(response.data));
      toast.success("Product successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendProductReaction =
  ({ ProductId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.Product(`/reactions`, {
        targetType: "Product",
        targetId: ProductId,
        emoji
      });
      dispatch(
        slice.actions.sendProductReactionSuccess({
          ProductId,
          reactions: response.data
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteProduct =
  ({ userId, ProductId, authorId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.delete(`/Products/${ProductId}`);
      toast.success("Delete successfully");
      dispatch(getCurrentUserProfile());
      dispatch(getProducts({ userId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const editProduct =
  ({ userId, ProductId, authorId, content, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      await apiService.put(`/Products/${ProductId}`, {
        content,
        image: imageUrl
      });
      toast.success("Edit successfully");
      dispatch(getCurrentUserProfile());
      dispatch(getProducts({ userId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
