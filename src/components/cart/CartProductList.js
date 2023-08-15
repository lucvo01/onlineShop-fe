import React from "react";
import { useSelector } from "react-redux";
import RemoveItemButton from "./RemoveItemButton";
import DecreaseButton from "./DecreaseButton";
import AddToCartButton from "./AddToCartButton";
import {
  Paper,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardMedia
} from "@mui/material";

function CartProductList() {
  const { products, subtotal } = useSelector((state) => state.cart);

  return (
    <Container sx={{ alignItems: "center", direction: "column" }}>
      <Typography variant="h4" align="center">
        Your Cart
      </Typography>
      <Paper
        sx={{ borderRadius: "10px", mt: 3, position: "relative", height: 1 }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit Price</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((item) => {
                return (
                  <TableRow key={item._id} hover>
                    <TableCell align="center">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          style={{ width: "50px", height: "50px" }}
                          sx={{ display: { xs: "none", md: "block" } }}
                        />
                        <Typography sx={{ marginLeft: "10px" }}>
                          {item.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {/* <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        }}
                      > */}
                      <AddToCartButton product={item} display={"+"} />
                      <Typography>{item.quantity}</Typography>
                      <DecreaseButton product={item} />
                      {/* </div> */}
                    </TableCell>
                    <TableCell align="center">${item.price}</TableCell>
                    <TableCell align="center">
                      ${item.itemTotal.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <RemoveItemButton product={item} />
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow hover>
                <TableCell align="center">Subtotal:</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">${subtotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default CartProductList;
