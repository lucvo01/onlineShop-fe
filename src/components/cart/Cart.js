import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { Link as RouterLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const { products } = useSelector((state) => state.cart);
  let numberOfItems = 0;
  products.forEach((product) => {
    numberOfItems += product.quantity;
  });
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => {
        navigate("/cart", from);
      }}
    >
      <Badge color="secondary" badgeContent={numberOfItems}>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
}

export default Cart;
