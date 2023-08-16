import React from "react";
import {
  Box,
  Button,
  Container,
  Breadcrumbs,
  Link,
  Typography
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import CartProductList from "../components/cart/CartProductList";

function CartPage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/shipping");
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Online Shop
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>
      <Box sx={{ flex: "2", padding: "10px" }} md={8} xs={12}>
        <CartProductList />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "1rem" }}>
        <Button variant="contained" onClick={handleClick}>
          Checkout
        </Button>
      </Box>
    </Container>
  );
}

export default CartPage;
