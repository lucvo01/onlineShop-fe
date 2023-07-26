import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "./slices/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function RemoveItemButton({ product }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeItem(product));
  };

  return (
    <Button onClick={handleClick}>
      <DeleteIcon />
    </Button>
  );
}

export default RemoveItemButton;
