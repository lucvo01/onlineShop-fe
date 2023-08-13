import React from "react";
import {
  Button,
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
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Cookies from "js-cookie";
import { createOrder } from "../components/slices/ordersSlice";
import apiService from "../app/apiService";

function PlaceOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, subtotal, shipping, isLoading } = useSelector(
    (state) => state.cart
  );

  // const { orders } = useSelector((state) => state.orders);

  const cookies = Cookies.get("user");
  let user;
  if (cookies) {
    user = JSON.parse(cookies);
    // console.log("storedUser", user);
  }

  const handleClick = async () => {
    try {
      const response = await apiService.post("/orders", {
        ...shipping,
        userId: user._id,
        products,
        subtotal
      });
      dispatch(
        createOrder({
          response
        })
      );
      // dispatch(getSingleUserOrders({ userId: user._id }));
      // // console.log("orders", orders);
      // const orderId = orders[orders.length - 1]._id;
      const orderId = response.data.data._id;
      navigate(`/my_order/${orderId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
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
                  {products?.map((item) => {
                    return (
                      <TableRow key={item._id} hover>
                        <TableCell>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CardMedia
                              component="img"
                              image={item.image}
                              style={{ width: "50px", height: "50px" }}
                              sx={{ display: { xs: "none", md: "block" } }}
                            />
                            <Typography sx={{ marginLeft: "10px" }}>
                              {item.name}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>${item.price * item.quantity}</TableCell>
                        {/* <TableCell>{currentOrder.delivery_status}</TableCell> */}
                      </TableRow>
                    );
                  })}
                  <TableRow hover>
                    <TableCell>Subtotal:</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">${subtotal}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            // sx={{ backgroundColor: "#5a5d63", borderRadius: "15px" }}
          >
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>Customer</Typography>
                <Typography>{shipping.email}</Typography>
                <Typography></Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Dividery To
                </Typography>
                <Typography>Address: {shipping.address}</Typography>
                <Typography>City: {shipping.city}</Typography>
                <Typography>State: {shipping.state}</Typography>
                <Typography>Phone: {shipping.phone}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Payment Method
                </Typography>
                <Typography> {shipping.payment_method}</Typography>
              </Stack>
              <Button variant="contained" onClick={handleClick}>
                Place Order
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default PlaceOrderPage;
