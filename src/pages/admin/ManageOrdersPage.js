import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
import { getOrders } from "../../components/slices/ordersSlice";
import PaginationBar from "../../components/PaginationBar";
import styled from "styled-components";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ManageOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    // console.log(pageNum);
    dispatch(getOrders({ pageNum }));
  }, [dispatch, pageNum]);

  const { orders, isLoading, totalPages } = useSelector(
    (state) => state.orders
  );

  return (
    <CenteredContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Manage Orders
          </Typography>
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
                      <TableCell>{order.payment_status}</TableCell>
                      <TableCell>{order.delivery_status}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            navigate(`/manage_orders/${order._id}/edit`)
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
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
          <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
            <PaginationBar
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
            />
          </Box>
        </>
      )}
    </CenteredContainer>
  );
}

export default ManageOrdersPage;
