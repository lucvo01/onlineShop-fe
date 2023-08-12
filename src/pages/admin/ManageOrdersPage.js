import {
  Chip,
  Paper,
  Box,
  Button,
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
import { getOrders } from "../../components/slices/ordersSlice";
import PaginationBar from "../../components/PaginationBar";
// import styled from "styled-components";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import OrderSort from "../../components/order/OrderSort";
import { Link as RouterLink } from "react-router-dom";

// const CenteredContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

function ManageOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  const defaultValues = {
    shipping_status: ""
  };
  const methods = useForm({
    defaultValues
  });
  const { watch } = methods;
  const filters = watch();

  const { delivery_status } = filters;

  useEffect(() => {
    dispatch(getOrders({ pageNum, delivery_status }));
  }, [dispatch, pageNum, delivery_status]);

  const { orders, isLoading, totalPages } = useSelector(
    (state) => state.orders
  );

  return (
    <Container>
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
            <Typography color="text.primary">Manage Orders</Typography>
          </Breadcrumbs>
          <Typography variant="h5" gutterBottom>
            Manage Orders
          </Typography>
          <FormProvider methods={methods}>
            <OrderSort />
          </FormProvider>
          <Paper sx={{ borderRadius: "10px", height: "100vh", mt: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>OrderId</TableCell>
                    <TableCell>Date</TableCell>
                    {/* <TableCell>Product</TableCell> */}
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>Delivery Status</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order, index) => {
                    return (
                      <TableRow key={order._id || index} hover>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        {/* <TableCell>product</TableCell> */}
                        <TableCell>${order.subtotal}</TableCell>
                        <TableCell>{order.payment_method}</TableCell>
                        <TableCell>
                          {order.payment_status === "Paid" ? (
                            <Chip
                              label={order.payment_status}
                              color="success"
                            />
                          ) : (
                            <Chip label={order.payment_status} />
                          )}
                        </TableCell>
                        <TableCell>
                          {order.delivery_status === "Delivered" ? (
                            <Chip
                              label={order.delivery_status}
                              color="success"
                            />
                          ) : (
                            <Chip label={order.delivery_status} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() =>
                              navigate(`/manage_orders/${order._id}/edit`)
                            }
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() =>
                              navigate(`/manage_orders/${order._id}`)
                            }
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
          </Paper>
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

export default ManageOrdersPage;
