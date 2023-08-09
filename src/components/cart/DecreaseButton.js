import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { decreaseItem, getSubtotal } from "../slices/cartSlice";

function DecreaseButton({ product }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(decreaseItem(product));
    dispatch(getSubtotal());
  };

  return (
    <Button variant="contained" onClick={handleClick} size="small">
      -
    </Button>
  );
}

export default DecreaseButton;
