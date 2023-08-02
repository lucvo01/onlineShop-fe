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
import {useSelector} from 'react-redux'
import RemoveItemButton from "./RemoveItemButton";
import DecreaseButton from "./DecreaseButton";
import AddToCartButton from "./AddToCartButton";

function CartProductList() {
  const {products, subtotal} = useSelector((state) => state.cart)

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((item) => {
              return (
                <TableRow key={item._id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell><AddToCartButton product={item} display={"+"}/>{item.quantity}<DecreaseButton product={item} /></TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.itemTotal.toFixed(2)}</TableCell>
                  <TableCell><RemoveItemButton product={item} /></TableCell>

                </TableRow>
              );
            })}
            <TableRow hover>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  Subtotal:
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                ></TableCell>
                <TableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                >
                  ${subtotal}
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CartProductList;
