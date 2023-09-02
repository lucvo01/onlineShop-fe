import React, { useEffect } from "react";
import {
  Box,
  Chip,
  Stack,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CardMedia
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getAnOrder } from "../components/slices/ordersSlice";
import PaypalButton from "../components/cart/PaypalButton";
import Cookies from "js-cookie";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getAnOrder({ orderId }));
  }, [dispatch, orderId]);

  const { currentOrder, isLoading } = useSelector((state) => state.orders);
  const products = currentOrder.products;

  // Retrieve user information from cookies
  const cookie = Cookies.get("user");
  let user;
  if (cookie) {
    user = JSON.parse(Cookies.get("user"));
  }

  const isAdmin = user && user.isAdmin;
  return (
    <Container sx={{ position: "relative", height: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Grid container padding={5} spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Delivery Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.map((item, index) => {
                    return (
                      <TableRow key={item._id._id || index} hover>
                        <TableCell>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CardMedia
                              component="img"
                              image={item._id.image}
                              style={{ width: "50px", height: "50px" }}
                              sx={{ display: { xs: "none", md: "block" } }}
                            />
                            <Typography sx={{ marginLeft: "10px" }}>
                              {item._id.name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{item._id.quantity}</TableCell>
                        <TableCell>${item._id.price}</TableCell>
                        <TableCell>${item._id.price * item.quantity}</TableCell>
                        <TableCell>{currentOrder.delivery_status}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow hover>
                    <TableCell>Subtotal:</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">${currentOrder.subtotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>Customer</Typography>
                <Typography>{currentOrder.email}</Typography>
                <Typography></Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Dividery To
                </Typography>
                <Typography>Address: {currentOrder.address}</Typography>
                <Typography>City: {currentOrder.city}</Typography>
                <Typography>State: {currentOrder.state}</Typography>
                <Typography>Phone: {currentOrder.phone}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Order Info
                </Typography>
                <Box>
                  Payment status:{" "}
                  {currentOrder.payment_status === "Paid" ? (
                    <Chip label={currentOrder.payment_status} color="success" />
                  ) : (
                    <Chip label={currentOrder.payment_status} color="error" />
                  )}
                </Box>
                <Box>
                  Deliverd status:{" "}
                  {currentOrder.delivery_status === "Delivered" ? (
                    <Chip
                      label={currentOrder.delivery_status}
                      color="success"
                    />
                  ) : (
                    <Chip label={currentOrder.delivery_status} color="error" />
                  )}
                </Box>
                {currentOrder.payment_method === "Paypal" && !isAdmin ? (
                  <PaypalButton total={currentOrder.subtotal} />
                ) : (
                  <Typography style={{ fontWeight: "bold" }}>
                    {currentOrder.payment_method}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default OrderDetailPage;
