import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function CartPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

const {carItems} = useSelector((state) => state.cart)


  useEffect(() => {
    
  }, []);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
       {carItems.map((item) => <ProductCard product = {item}/>)}
        
      </Stack>
    </Container>
  );
}

export default CartPage;
