import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./slices/cartSlice";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
  };

  return <Button onClick={handleClick}>Add to cart</Button>;
}

export default AddToCartButton;
