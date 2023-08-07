import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, getSubtotal } from "../slices/cartSlice";

function AddToCartButton({ product, display }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(getSubtotal());
  };

  return (
    <Button variant="outlined" onClick={handleClick} size="small">
      {display}
    </Button>
  );
}

export default AddToCartButton;
