import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrders } from "../../components/slices/ordersSlice";
import PaginationBar from "../../components/PaginationBar";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function OrdersPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(getOrders({ pageNum }));
  }, [dispatch, pageNum]);

  const { orders, isLoading, totalPages, error } = useSelector(
    (state) => state.orders
  );

  return (
    <CenteredContainer>
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
      <Box sx={{ mt: "2rem" }}>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPages}
        />
      </Box>
    </CenteredContainer>
  );
}

export default OrdersPage;
