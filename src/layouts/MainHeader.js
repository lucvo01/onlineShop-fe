import * as React from "react";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import Cart from "../components/cart/Cart";
import {
  AppBar,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Box,
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ColorModeButton from "../components/ColorModeButton";
import Cookies from "js-cookie";

function MainHeader() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await auth.logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";

  // Retrieve user information from cookies
  const cookie = Cookies.get("user");
  let user;
  if (cookie) {
    user = JSON.parse(Cookies.get("user"));
  }

  const isAdmin = user && user.isAdmin;

  const adminMenu = (
    <Box>
      <MenuItem
        onClick={handleMenuClose}
        to="/admin"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Admin Dashboard
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        to="/manage_orders"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Manage Orders
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        to="/manage_products"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Manage Products
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        to="/manage_users"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Manage Users
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
    </Box>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      {isAdmin ? (
        adminMenu
      ) : (
        <Box>
          <MenuItem
            onClick={handleMenuClose}
            to="/my_profile"
            component={RouterLink}
            sx={{ mx: 1 }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            to="/my_order"
            component={RouterLink}
            sx={{ mx: 1 }}
          >
            My Order
          </MenuItem>

          <Divider sx={{ borderStyle: "dashed" }} />
        </Box>
      )}

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        {auth.isAuthenticated ? "Logout" : "Login"}
      </MenuItem>
    </Menu>
  );
  return (
    <Box>
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Online Shop
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Hi {user?.name}!
          </Typography>

          <ColorModeButton />
          {isAdmin ? null : <Cart />}
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              // src={user.avatarUrl}
              // alt={user.name}
              sx={{
                width: 32,
                height: 32,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.1)"
                }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

export default MainHeader;
