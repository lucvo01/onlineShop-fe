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
import Cookies from "js-cookie";
import { getAnOrder } from "../components/slices/ordersSlice";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getAnOrder({ orderId }));
  }, [dispatch, orderId]);

  const { currentOrder, isLoading } = useSelector((state) => state.orders);

  // const order = orders.find((order) => order._id === orderId);
  const products = currentOrder.products;

  // console.log("isLoading", isLoading);
  // console.log("products", products);
  // console.log("currentOrder", currentOrder);

  // const cookie = Cookies.get("user");
  // let user;
  // if (cookie) {
  //   user = JSON.parse(Cookies.get("user"));
  // }

  // const isAdmin = user && user.isAdmin;

  // const renderEdit = isAdmin ? <></> : null;

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
                      <TableRow key={item._id._id} hover>
                        <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            component="img"
                            image={item._id.image}
                            style={{ width: "50px", height: "50px" }}
                            sx={{ display: { xs: "none", md: "block" } }}
                          />
                          <Typography sx={{ marginLeft: "10px" }}>{item._id.name}</Typography>
                           </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
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
          <Grid
            item
            xs={12}
            md={4}
            // sx={{ backgroundColor: "#5a5d63", borderRadius: "15px" }}
          >
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
                <Typography>Address: {currentOrder.shipping}</Typography>
                <Typography>Phone: {currentOrder.phone}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Order Info
                </Typography>
                <Box>
                  Payment status: <Chip label={currentOrder.payment_status} />
                </Box>
                <Box>
                  Deliverd status: <Chip label={currentOrder.delivery_status} />{" "}
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default OrderDetailPage;
