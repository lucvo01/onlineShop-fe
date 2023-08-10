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
import PaymentPage from "../pages/PaymentPage";
import AuthRequire from "./AuthRequire";
import UserOrderPage from "../pages/UserOrderPage";
import UserProfilePage from "../pages/UserProfilePage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrderEditModal from "../components/order/OrderEditModal";
import ShippingPage from "../pages/ShippingPage";
import PlaceOrderPage from "../pages/PlaceOrderPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/shipping"
          element={
            <AuthRequire>
              <ShippingPage />{" "}
            </AuthRequire>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthRequire>
              <PaymentPage />{" "}
            </AuthRequire>
          }
        />
        <Route
          path="/placeorder"
          element={
            <AuthRequire>
              <PlaceOrderPage />{" "}
            </AuthRequire>
          }
        />

        <Route path="/my_order">
          <Route
            index
            element={
              <AuthRequire>
                <UserOrderPage />
              </AuthRequire>
            }
          />
          <Route
            path=":orderId"
            element={
              <AuthRequire>
                <OrderDetailPage />
              </AuthRequire>
            }
          />
        </Route>

        <Route path="/my_profile">
          <Route
            index
            element={
              <AuthRequire>
                <UserProfilePage />
              </AuthRequire>
            }
          />
        </Route>

        <Route path="/manage_orders">
          <Route
            index
            element={
              <AuthRequire>
                <ManageOrdersPage />
              </AuthRequire>
            }
          />
          <Route
            path=":orderId"
            element={
              <AuthRequire>
                <OrderDetailPage />
              </AuthRequire>
            }
          />
          <Route path=":orderId/edit" element={<OrderEditModal />} />
        </Route>

        <Route path="/manage_products">
          <Route
            index
            element={
              <AuthRequire>
                <ManageProductsPage />
              </AuthRequire>
            }
          />
          <Route path="create" element={<ProductEditModal />} />
          <Route path=":productId/edit" element={<ProductEditModal />} />
          <Route path=":productId/delete" element={<ProductDeleteModal />} />
        </Route>

        <Route path="/manage_users">
          <Route
            index
            element={
              <AuthRequire>
                <ManageUsersPage />
              </AuthRequire>
            }
          />
          <Route
            path=":userId/orders"
            element={
              <AuthRequire>
                <UserOrderPage />
              </AuthRequire>
            }
          />
        </Route>
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
