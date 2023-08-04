import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import RemoveItemButton from "./RemoveItemButton";
import DecreaseButton from "./DecreaseButton";
import AddToCartButton from "./AddToCartButton";
import CardMedia from "@mui/material/CardMedia";

function CartProductList() {
  const { products, subtotal } = useSelector((state) => state.cart);

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
                  <TableCell>
                    <CardMedia
                      component="img"
                      image={item.image}
                      height="50"
                      width="100%"
                      sx={{ display: { xs: "none", md: "block" } }}
                    />
                    <Typography>{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <AddToCartButton product={item} display={"+"} />
                    {item.quantity}
                    <DecreaseButton product={item} />
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>${item.itemTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <RemoveItemButton product={item} />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow hover>
              <TableCell>Subtotal:</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="left">${subtotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CartProductList;
