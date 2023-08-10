import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, getSubtotal } from "../slices/cartSlice";

function AddToCartButton({ product, display, size, hideButton }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(getSubtotal());
  };

  if (hideButton) {
    return null;
  }
  return (
    <Button variant="contained" onClick={handleClick} size={size || "small"}>
      {display}
    </Button>
  );
}

export default AddToCartButton;
