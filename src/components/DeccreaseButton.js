import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { decreaseItem } from "./slices/cartSlice";

function DeccreaseButton({ product }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(decreaseItem(product));
  };

  return <Button onClick={handleClick}>-</Button>;
}

export default DeccreaseButton;
