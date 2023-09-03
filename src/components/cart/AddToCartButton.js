import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, getSubtotal } from "../slices/cartSlice";

function AddToCartButton({ product, size, display, hideButton }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("size", size);
    dispatch(addToCart({ ...product, size }));
    dispatch(getSubtotal());
  };

  if (hideButton) {
    return null;
  }
  return (
    <Button variant="contained" onClick={handleClick} size={"small"}>
      {display}
    </Button>
  );
}

export default AddToCartButton;
