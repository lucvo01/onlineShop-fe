import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import OrdersPage from "../pages/admin/OrdersPage";
import ProductsPage from "../pages/admin/ProductsPage";
import UsersPage from "../pages/admin/UsersPage";
import ProductEditModal from "../components/ProductEditModal";
import ProductDeleteModal from "../components/ProductDeleteModal";
import CheckoutPage from "../pages/CheckoutPage";
// import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <AuthRequire>
          <MainLayout />
          // </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path="create" element={<ProductEditModal />} />
          <Route path=":productId/edit" element={<ProductEditModal />} />
        </Route>

        <Route
          path="/products/:productId/delete"
          element={<ProductDeleteModal />}
        />
        <Route path="/users" element={<UsersPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
