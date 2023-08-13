import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PRODUCTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  totalPages: 1
};

const productSlice = createSlice({
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
      state.currentPageProducts = [];
    },
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;
      state.products = [...state.products, newProduct];
    },
    editProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;
      state.products.forEach((product) => {
        if ((product._id = newProduct._id)) product = newProduct;
      });
    }
  }
});

export default productSlice.reducer;

export const getProducts =
  ({
    pageNum = 1,
    limit = PRODUCTS_PER_PAGE,
    searchQuery,
    gender,
    category,
    priceRange
  }) =>
  async (dispatch) => {
    dispatch(productSlice.actions.startLoading());
    try {
      const params = { page: pageNum, limit };
      if (searchQuery) params.name = searchQuery;
      if (gender) params.gender = gender;
      if (category) params.category = category;
      if (priceRange) params.priceRange = priceRange;
      // console.log("gender", gender);
      console.log("params", params);
      const response = await apiService.get("/products", { params });
      dispatch(productSlice.actions.getProductsSuccess(response.data.data));
      // console.log("priceRange", response);
    } catch (error) {
      dispatch(productSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createProduct =
  ({ name, description, price, image }) =>
  async (dispatch) => {
    dispatch(productSlice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/products", {
        name,
        description,
        price,
        image: imageUrl
      });
      // let formData = new FormData();
      // formData.append("file", image);
      // formData.append("description", description);
      // formData.append("name", name);
      // formData.append("price", price);
      // const response = await apiService.post("/products", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // });
      dispatch(productSlice.actions.createProductSuccess(response.data));
      toast.success("Create Product Success");
      dispatch(getProducts());
    } catch (error) {
      dispatch(productSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(productSlice.actions.startLoading());
  try {
    console.log("id", productId);
    await apiService.put(`/products/${productId}/delete`);
    toast.success("Delete product successful");
    dispatch(getProducts());
  } catch (error) {
    dispatch(productSlice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editProduct =
  ({ productId, name, description, price, image }) =>
  async (dispatch) => {
    dispatch(productSlice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      await apiService.put(`/products/${productId}/edit`, {
        name,
        description,
        price,
        image: imageUrl
      });
      toast.success("Edit successfully");
      dispatch(getProducts());
    } catch (error) {
      dispatch(productSlice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
