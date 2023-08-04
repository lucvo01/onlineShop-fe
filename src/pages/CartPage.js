import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../components/slices/ordersSlice";
import { values } from "lodash";
import CartProductList from "../components/cart/CartProductList";

function CartPage() {
  const { products, subtotal } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/cart/checkout");
  };

  return (
    <Box>
      <Box sx={{ flex: "2", padding: "10px" }} md={8} xs={12}>
        <CartProductList />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
        <Button onClick={handleClick}>Checkout</Button>
      </Box>
    </Box>
  );
}

export default CartPage;
