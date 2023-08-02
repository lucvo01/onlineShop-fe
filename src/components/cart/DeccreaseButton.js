import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { decreaseItem, getSubtotal } from "../slices/cartSlice";

function DeccreaseButton({ product }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(decreaseItem(product));
    dispatch(getSubtotal());
  };

  return <Button onClick={handleClick}>-</Button>;
}

export default DeccreaseButton;
