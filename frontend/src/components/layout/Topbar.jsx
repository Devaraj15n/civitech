import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Grid,
  Button,
  Menu,
  MenuItem
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../features/auth/authSlice"; // adjust path
import { useNavigate } from "react-router-dom";

const Topbar = ({ sidebarWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((s) => s.auth); // ✅ logged user
  const [anchorEl, setAnchorEl] = useState(null);

  // console.log("user=======");
  // console.log(user);
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#000" }}>
          
        </Typography>

        {/* Right Section */}
        <Box>
          <Grid
            container
            alignItems="center"
            spacing={1}
            sx={{ cursor: "pointer" }}
            onClick={handleMenuOpen}
          >
            <Grid item>
              <Avatar sx={{ bgcolor: "#1976d2" }}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            </Grid>

            <Grid item>
              <Typography variant="body2" color="#000" fontWeight={500}>
                {user?.username || "User"}
              </Typography>
            </Grid>
          </Grid>

          {/* Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
