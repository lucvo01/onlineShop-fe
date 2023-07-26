import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Cart from '../components/Cart'
function MainHeader() {
  const auth = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Online Shop
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" color="inherit" component="div">
            Welcome {auth.user?.name}!
          </Typography>
          {auth.user ? (
            <Button
              variant="h6"
              color="inherit"
              component="div"
              onClick={() => {
                auth.logout(() => {
                  navigate(from, { replace: true });
                });
              }}>
              Logout
            </Button>
          ) : (
            <Button
              variant="h6"
              color="inherit"
              component="div"
              onClick={() => {
                navigate("/login", from);
              }}>
              Login
            </Button>
          )}
          {auth.user?.isAdmin ? (
            <>
              <Button
                variant="h6"
                color="inherit"
                component="div"
                onClick={() => {
                  navigate("/orders", { replace: true });
                }}>
                Orders
              </Button>
              <Button
                variant="h6"
                color="inherit"
                component="div"
                onClick={() => {
                  navigate("/admin/products", { replace: true });
                }}>
                Products
              </Button>
              <Button
                variant="h6"
                color="inherit"
                component="div"
                onClick={() => {
                  navigate("/users", { replace: true });
                }}>
                Users
              </Button>
            </>
          ) : (
            ""
          )}

          <Cart />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
