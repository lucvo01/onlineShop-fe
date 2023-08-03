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
import ProductEditModal from "../components/product/ProductEditModal";
import ProductDeleteModal from "../components/product/ProductDeleteModal";
import CheckoutPage from "../pages/CheckoutPage";
import AuthRequire from "./AuthRequire";
import UserOrderPage from "../pages/UserOrderPage";
import UserProfilePage from "../pages/UserProfilePage";

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
        <Route path="/order/:ordersId" element={<UserOrderPage />} />
        <Route path="/orders" element={<OrdersPage />}>
          <Route index element={<OrdersPage />} />
          {/* <Route path="create" element={<ProductEditModal />} /> */}
          {/* <Route path=":orderId/edit" element={<OrderEditModal />} /> */}
          {/* <Route path=":orderId/delete" element={<OrderDeleteModal />} /> */}
        </Route>
        <Route path="/products">
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
