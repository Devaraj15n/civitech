import { Box } from "@mui/material";
import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { Outlet } from "react-router-dom";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar
        onToggle={(open) => setSidebarOpen(open)}
      />

      <Box flexGrow={1}>
        <Topbar
          sidebarWidth={
            sidebarOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH
          }
        />

        <Box
          component="main"
          sx={{
            p: 1,
            mt: "64px",
            backgroundColor: "#fff",
            minHeight: "calc(100vh - 64px)",
            transition: "margin 0.3s ease"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
