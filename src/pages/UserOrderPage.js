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
// import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UserOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  // const auth = useAuth();
  // console.log("auth", auth);
  // const userId = auth.user?.data._id;
  const user = JSON.parse(Cookies.get("user"));
  const userId = user._id;

  useEffect(() => {
    // console.log(user);
    dispatch(getSingleUserOrders({ userId }));
  }, [dispatch, userId]);

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
            User Order
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
                  <TableCell>Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order, index) => {
                  return (
                    <TableRow key={order._id || index} hover>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.createdAt}</TableCell>
                      <TableCell>product</TableCell>
                      <TableCell>${order.subtotal}</TableCell>
                      <TableCell>{order.payment_method}</TableCell>
                      <TableCell>{order.payment_status}</TableCell>
                      <TableCell>{order.delivery_status}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => navigate(`/my_order/${order._id}`)}
                        >
                          Detail
                        </button>
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

export default UserOrderPage;
