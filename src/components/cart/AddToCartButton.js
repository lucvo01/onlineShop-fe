import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, getSubtotal } from "../slices/cartSlice";

function AddToCartButton({ product, display, size }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(getSubtotal());
  };

  return (
    <Button
      user-select="none"
      text-align="center"
      vertical-align="middle"
      text-decoration="none"
      text-transform="uppercase"
      border-radius="6px"
      variant="contained"
      onClick={handleClick}
      size={size || "small"}
    >
      {display}
    </Button>
  );
}

export default AddToCartButton;
