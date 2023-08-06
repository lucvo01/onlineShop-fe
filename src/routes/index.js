import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import ProductDetailPage from "../pages/ProductDetailPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ManageOrdersPage from "../pages/admin/ManageOrdersPage";
import ProductsPage from "../pages/admin/ProductsPage";
import UsersPage from "../pages/admin/UsersPage";
import ProductEditModal from "../components/product/ProductEditModal";
import ProductDeleteModal from "../components/product/ProductDeleteModal";
import CheckoutPage from "../pages/CheckoutPage";
import AuthRequire from "./AuthRequire";
import UserOrderPage from "../pages/UserOrderPage";
import UserProfilePage from "../pages/UserProfilePage";
import OrderDetailPage from "../pages/OrderDetailPage";
import EditOrderPage from "../pages/admin/EditOrderPage";
import OrderEditModal from "../components/order/OrderEditModal";

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
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/checkout" element={<CheckoutPage />} />

        <Route path="/my_order">
          <Route index element={<UserOrderPage />} />
          <Route path=":orderId" element={<OrderDetailPage />} />
        </Route>

        <Route path="/manage_orders">
          <Route index element={<ManageOrdersPage />} />
          <Route path=":orderId" element={<OrderDetailPage />} />
          <Route path=":orderId/edit" element={<OrderEditModal />} />
        </Route>

        <Route path="/manage_products">
          <Route index element={<ProductsPage />} />
          <Route path="create" element={<ProductEditModal />} />
          <Route path=":productId/edit" element={<ProductEditModal />} />
          <Route path=":productId/delete" element={<ProductDeleteModal />} />
        </Route>

        <Route path="/users" element={<UsersPage />} />
        <Route path="/account" element={<UserProfilePage />} />
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
