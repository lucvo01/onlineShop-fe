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
import {useSelector} from "react-redux";

function OrdersPage() {
  const {orders} = useSelector((state) => state.orders)
  
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
            <TableRow>
              {orders.map(order) => {
                return   
                (
                <TableCell>{order.quantity}</TableCell>
              <TableCell></TableCell>)
              }}
              
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrdersPage;
