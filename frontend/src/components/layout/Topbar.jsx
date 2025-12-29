import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Grid
} from "@mui/material";

const Topbar = ({ sidebarWidth }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${sidebarWidth}px)`,
                ml: `${sidebarWidth}px`,
                backgroundColor: "#fff"
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>

                <Box sx={{ width: "100%" }}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={1}
                    >
                        {/* Avatar */}
                        <Grid>
                            <IconButton>
                                <Avatar alt="Profile" />
                            </IconButton>
                        </Grid>

                        {/* Username */}
                        <Grid>
                            <Typography variant="body2" color="#000" fontWeight={500}>
                                Admin
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
