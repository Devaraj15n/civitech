import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";

export default function TransactionActions({ onAction }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (type) => {
    handleClose();
    onAction(type);
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        + Transaction
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect("payment-in")}>
          <ListItemIcon><SouthIcon color="success" /></ListItemIcon>
          <ListItemText>Payment In</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleSelect("payment-out")}>
          <ListItemIcon><NorthIcon color="error" /></ListItemIcon>
          <ListItemText>Payment Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
