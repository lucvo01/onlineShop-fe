import {
  Chip,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Link,
  Container
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserOrders } from "../components/slices/ordersSlice";
import PaginationBar from "../components/PaginationBar";
// import styled from "styled-components";
import Cookies from "js-cookie";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import formatDate from "../utils/formatDate";

// const CenteredContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

function UserOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pageNum, setPageNum] = useState(1);
  // const auth = useAuth();
  // console.log("auth", auth);
  // const userId = auth.user?.data._id;
  let userId;

  if (id) {
    userId = id;
  } else {
    const user = JSON.parse(Cookies.get("user"));
    userId = user._id;
  }

  useEffect(() => {
    // console.log(user);
    dispatch(getSingleUserOrders({ userId }));
  }, [dispatch, userId]);

  const { orders, isLoading, totalPages } = useSelector(
    (state) => state.orders
  );

  return (
    <Container sx={{ position: "relative", height: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link
              underline="hover"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Online Shop
            </Link>
            <Typography color="text.primary">My Order</Typography>
          </Breadcrumbs>
          <Typography variant="h4" align="center">
            Order
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    OrderId
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    Date
                  </TableCell>
                  {/* <TableCell>Product</TableCell> */}
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Delivery Status</TableCell>
                  <TableCell>Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index) => {
                  return (
                    <TableRow key={order._id || index} hover>
                      <TableCell
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {order._id}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {formatDate(order.createdAt)}
                      </TableCell>
                      {/* <TableCell>product</TableCell> */}
                      <TableCell>${order.subtotal}</TableCell>
                      <TableCell>{order.payment_method}</TableCell>
                      <TableCell>
                        {order.payment_status === "Paid" ? (
                          <Chip label={order.payment_status} color="success" />
                        ) : (
                          <Chip label={order.payment_status} color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        {order.delivery_status === "Delivered" ? (
                          <Chip label={order.delivery_status} color="success" />
                        ) : (
                          <Chip label={order.delivery_status} color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/my_order/${order._id}`)}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default UserOrderPage;
