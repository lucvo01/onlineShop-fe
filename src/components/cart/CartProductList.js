import {Box, Paper,
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
    <Container sx={{ display: "flex", alignItems: "center", flexDirection: 'column' }}>
        <Typography variant="h4">Your Cart</Typography>
        <Paper sx={{ borderRadius: "10px", mt: 3,  position: "relative", height: 1 }}>
            <TableContainer>
          <Table >
            <TableHead>
              <TableRow >
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
                    <TableCell>
                      <Box direction="row">
                        <AddToCartButton product={item} display={"+"} />
                        <Typography>{item.quantity}</Typography>
                        <DecreaseButton product={item} />
                      </Box>
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
        </Paper>
    </Container>
  );
}

export default CartProductList;
