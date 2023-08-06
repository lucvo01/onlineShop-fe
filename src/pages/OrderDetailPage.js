import React from "react";
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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Cookies from "js-cookie";

function OrderDetailPage() {
  const { orderId } = useParams();
  const { orders, isLoading } = useSelector((state) => state.orders);

  const order = orders.find((order) => order._id === orderId);
  const products = order.products;

  console.log("isLoading", isLoading);
  console.log("products", products);
  console.log("order", order);

  const cookie = Cookies.get("user");
  let user;
  if (cookie) {
    user = JSON.parse(Cookies.get("user"));
  }
  // console.log("storedUser", user);

  const isAdmin = user && user.isAdmin;

  const renderEdit = isAdmin ? <></> : null;

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
                          <CardMedia
                            component="img"
                            image={item._id.image}
                            height="50"
                            width="100%"
                            sx={{ display: { xs: "none", md: "block" } }}
                          />
                          <Typography>{item._id.name}</Typography>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item._id.price}</TableCell>
                        <TableCell>${item._id.price * item.quantity}</TableCell>
                        <TableCell>{order.delivery_status}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow hover>
                    <TableCell>Subtotal:</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">${order.subtotal}</TableCell>
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
                <Typography>{order.email}</Typography>
                <Typography></Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Dividery To
                </Typography>
                <Typography>Address: {order.shipping}</Typography>
                <Typography>Phone: {order.phone}</Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography style={{ fontWeight: "bold" }}>
                  Order Info
                </Typography>
                <Box>
                  Payment status: <Chip label={order.payment_status} />
                </Box>
                <Box>
                  Deliverd status: <Chip label={order.delivery_status} />{" "}
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
