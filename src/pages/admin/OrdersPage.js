import {
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
import { getOrders } from "../components/slices/ordersSlice";
import { useLocation, useNavigate } from "react-router-dom";
// import PaginationBar from "../components/PaginationBar";

function OrdersPage() {
    const dispatch = useDispatch();
      const location = useLocation();
      const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(1);
  const { orders, isLoading, totalPages, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders({pageNum}));
  }, [dispatch, pageNum]);

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => {
              return (
                <TableRow key={item._id} hover>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer"
                    }}>
                   {orders.shipping}
                  </TableCell>
                  <TableCell
                    // align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {/* <Button
                      onClick={() => navigate(`/orders/${item._id}/edit`)}>
                      Edit
                    </Button> */}
                    <Button
                      onClick={() => navigate(`/orders/${item._id}/delete`)}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      display: { xs: "none", md: "table-cell" }
                    }}></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrdersPage;
