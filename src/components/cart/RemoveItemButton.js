import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, getSubtotal } from "../slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function RemoveItemButton({ product, size }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeItem({ ...product, size }));
    dispatch(getSubtotal());
  };

  return (
    <Button variant="outlined" onClick={handleClick} size="small">
      <DeleteIcon />
    </Button>
  );
}

export default RemoveItemButton;
