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
import ManageProductsPage from "../pages/admin/ManageProductsPage";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ProductEditModal from "../components/product/ProductEditModal";
import ProductDeleteModal from "../components/product/ProductDeleteModal";
import CheckoutPage from "../pages/CheckoutPage";
import AuthRequire from "./AuthRequire";
import UserOrderPage from "../pages/UserOrderPage";
import UserProfilePage from "../pages/UserProfilePage";
import OrderDetailPage from "../pages/OrderDetailPage";
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

        <Route
          path="/my_order"
          element={
            <AuthRequire>
              <UserOrderPage />
            </AuthRequire>
          }
        >
          <Route index element={<UserOrderPage />} />
          <Route path=":orderId" element={<OrderDetailPage />} />
        </Route>

        <Route
          path="/my_profile"
          element={
            <AuthRequire>
              <UserProfilePage />
            </AuthRequire>
          }
        >
          <Route index element={<UserProfilePage />} />
        </Route>

        <Route path="/manage_orders">
          <Route index element={<ManageOrdersPage />} />
          <Route path=":orderId" element={<OrderDetailPage />} />
          <Route path=":orderId/edit" element={<OrderEditModal />} />
        </Route>

        <Route
          path="/manage_products"
          element={
            <AuthRequire>
              <ManageProductsPage />
            </AuthRequire>
          }
        >
          <Route index element={<ManageProductsPage />} />
          <Route path="create" element={<ProductEditModal />} />
          <Route path=":productId/edit" element={<ProductEditModal />} />
          <Route path=":productId/delete" element={<ProductDeleteModal />} />
        </Route>

        <Route
          path="/manage_users"
          element={
            <AuthRequire>
              <ManageUsersPage />
            </AuthRequire>
          }
        />
        <Route index element={<ManageUsersPage />} />
        {/* <Route path="/account" element={<UserProfilePage />} /> */}
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
