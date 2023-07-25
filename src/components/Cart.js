import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import { Link as RouterLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
const location = useLocation()
let from = location.state?.from?.pathname || "/";

  return (
    <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
              <ShoppingCartOutlinedIcon onClick={() => {navigate('/cart', from )}}/>
          </IconButton>
 
  )
}

export default Cart