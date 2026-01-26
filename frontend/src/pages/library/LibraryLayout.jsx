import { Outlet, NavLink } from "react-router-dom";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    Divider
} from "@mui/material";

const libraryMenus = [
    { label: "Party Type", path: "party-types" },
    { label: "Material Category", path: "material-categories" },
    { label: "Material Library", path: "materials" },
    // { label: "Party Library", path: "parties" },
    { label: "Cost Code Library", path: "cost-codes" },
    { label: "Rate Library", path: "rates" },
    { label: "Workforce Type", path: "workforce-types" },
    // { label: "Workforce Library", path: "workforce" },
    // { label: "Asset Type Library", path: "asset-types" },
    // { label: "Deduction Library", path: "deductions" },
    // { label: "Retention Library", path: "retentions" },
    // { label: "Progress Master", path: "progress" }
];

const LibraryLayout = () => {
    return (
        <Box sx={{ display: "flex", height: "100%" }}>

            {/* LEFT LIBRARY SIDEBAR */}
            <Box
                sx={{
                    width: 260,
                    borderRight: "1px solid #e0e0e0",
                    bgcolor: "#fafafa"
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ p: 2 }}
                >
                    Library Masters
                </Typography>

                <Divider />

                <List dense>
                    {libraryMenus.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            sx={{
                                "&.active": {
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    "& .MuiListItemText-root": { fontWeight: 600 }
                                }
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            {/* RIGHT CONTENT */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default LibraryLayout;
