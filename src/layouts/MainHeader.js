import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useUserState } from "../contexts/AuthContext";
import Cart from "../components/cart/Cart";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import ColorModeButton from "../components/ColorModeButton";
import Cookies from "js-cookie";

function MainHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const { user } = useUserState();
  // console.log("useUserState", useUserState());

  // React.useEffect(() => {
  //   console.log(user);
  //   console.log("user.name", user);
  // }, [user]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
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
  // console.log("storedUser", user);

  const isAdmin = user && user.isAdmin;

  const adminMenu = isAdmin ? (
    <Box>
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
      <Divider sx={{ borderStyle: "dashed" }} />
    </Box>
  ) : null;

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

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
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

      {/* {user && user.isAdmin ? adminMenu : <Box></Box>} */}
      {adminMenu}
      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
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
          <ColorModeButton />
          <Cart />
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              // src={user.avatarUrl}
              // alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

export default MainHeader;
