import {
  Box,
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
import { getSingleUserOrders } from "../components/slices/ordersSlice";
import PaginationBar from "../components/PaginationBar";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UserOrderPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const auth = useAuth();
  console.log("auth", auth);
  const userId = auth.user?.data._id;

  useEffect(() => {
    dispatch(getSingleUserOrders({ userId: userId }));
  }, [dispatch, userId]);

  const { orders, isLoading, totalPages, error } = useSelector(
    (state) => state.orders
  );

  return (
    <CenteredContainer>
      <Typography variant="h5" gutterBottom>
        My Order
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>OrderId</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Delivery Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((item) => {
              return (
                <TableRow key={item._id} hover>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>product</TableCell>
                  <TableCell>${item.subtotal}</TableCell>
                  <TableCell>{item.payment_method}</TableCell>
                  <TableCell>{item.payment_status}</TableCell>
                  <TableCell>{item.delivery_status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
        <PaginationBar page={page} setPage={setPage} count={totalPages} />
      </Box>
    </CenteredContainer>
  );
}

export default UserOrderPage;
