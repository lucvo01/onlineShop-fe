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
import ProductCard from "../components/product/ProductCard";
import AddToCartButton from "../components/cart/AddToCartButton";
import DecreaseButton from "../components/cart/DecreaseButton";
import RemoveItemButton from "../components/cart/RemoveItemButton";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../components/slices/ordersSlice";
import { values } from "lodash";

function CartPage() {
  const { products, subtotal } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/cart/checkout");
  };

  return (
    <Grid container
      spacing={2}
      sx={{ mt: "3rem", display: "flex", height: "100vh" }}  md={12} xs={12}>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                  Product
                </TableCell>
                <TableCell>Action</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => {
                return (
                  <TableRow key={item._id} hover>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer"
                      }}
                    >
                      <ProductCard product={item} sx={{ width: "50%" }} />
                    </TableCell>
                    <TableCell
                      // align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      <AddToCartButton product={item} display={"+"} />
                      {item.quantity}
                      <DecreaseButton product={item} />
                      <RemoveItemButton product={item} />
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      ${item.itemTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow hover>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  Subtotal:
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  ${subtotal}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
          <Button onClick={handleClick}>Checkout</Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default CartPage;
