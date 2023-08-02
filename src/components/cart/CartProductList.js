import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";

function CartProductList() {
  const orders = [];

  return (
    <Container>
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
    </Container>
  );
}

export default CartProductList;
