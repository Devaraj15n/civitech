import { useState } from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
    Box
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StoreIcon from "@mui/icons-material/Store";
import ChatIcon from "@mui/icons-material/Chat";
import BarChartIcon from "@mui/icons-material/BarChart";
import PaymentIcon from "@mui/icons-material/Payment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BuildIcon from "@mui/icons-material/Build";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useNavigate } from "react-router-dom";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

const Sidebar = ({ onToggle }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleToggle = () => {
        setOpen(!open);
        onToggle?.(!open);
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Projects", icon: <WorkIcon />, path: "/projects" },
        { text: "Timesheet", icon: <EventNoteIcon />, path: "/timesheet" },
        { text: "MOM", icon: <AssignmentIcon />, path: "/mom" },
        { text: "To Do", icon: <AssignmentIcon />, path: "/todo" },
        { text: "Quotation", icon: <ShoppingCartIcon />, path: "/quotation" },
        { text: "Finance", icon: <AccountBalanceIcon />, path: "/finance" },
        { text: "Warehouse", icon: <StoreIcon />, path: "/warehouse" },
        { text: "Chat Groups", icon: <ChatIcon />, path: "/chat-groups" },
        { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
        { text: "Payroll", icon: <PaymentIcon />, path: "/payroll" },
        { text: "Assets", icon: <EngineeringIcon />, path: "/assets" },
        { text: "Services", icon: <BuildIcon />, path: "/services" },
        { text: "Library", icon: <LibraryBooksIcon />, path: "/library" },
        { text: "Setting", icon: <SettingsIcon />, path: "/setting" },
        { text: "Help", icon: <HelpOutlineIcon />, path: "/help" }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                flexShrink: 0,
                whiteSpace: "nowrap",
                "& .MuiDrawer-paper": {
                    width: open ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    transition: "width 0.3s ease",
                    backgroundColor: "#190c4f",
                    color: "#ffffff"
                }
            }}
        >
            {/* Logo + Toggle */}
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "space-between" : "center",
                    px: 2,
                    py: 1.5
                }}
            >
                {open && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Optional logo icon */}
                        <Box
                            component="span"
                            sx={{
                                width: 32,
                                height: 32,
                                mr: 1,
                                bgcolor: "#ffffff33",
                                borderRadius: 1
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            color="inherit"
                            sx={{ lineHeight: 1 }}
                        >
                            Civi Tech
                        </Typography>
                    </Box>
                )}

                <IconButton sx={{ color: "#ffffff" }} onClick={handleToggle}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {/* Menu Items */}
            <List>
                {menuItems.map((item) => (
                    <Tooltip
                        key={item.text}
                        title={!open ? item.text : ""}
                        placement="right"
                    >
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={{
                                justifyContent: open ? "flex-start" : "center",
                                px: 2.5,
                                color: "#ffffff",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" }
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 2 : "auto",
                                    justifyContent: "center",
                                    color: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    "& .MuiSvgIcon-root": { fontSize: "1.3rem" }
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            {open && (
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "0.85rem",
                                        fontWeight: 300,
                                        lineHeight: 1.2
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </Tooltip>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
