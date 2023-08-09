import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartProductList from "../components/cart/CartProductList";

function CartPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/shipping");
  };

  return (
    <Box>
      <Box sx={{ flex: "2", padding: "10px" }} md={8} xs={12}>
        <CartProductList />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
        <Button variant="contained" onClick={handleClick}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

export default CartPage;
