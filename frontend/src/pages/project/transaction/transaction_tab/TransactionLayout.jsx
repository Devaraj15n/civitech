import { Box, Tabs, Tab } from "@mui/material";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

const INNER_TABS = ["list", "payment-requests"];

export default function TransactionLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const currentTab = useMemo(() => {
    const tab = location.pathname.split("/")[4];
    return INNER_TABS.includes(tab) ? tab : "list";
  }, [location.pathname]);

  const handleChange = (_, value) => {
    navigate(`/projects/${id}/transactions/${value}`);
  };

  return (
    <Box>
      {/* 🔹 Inner transaction tabs */}
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <Tab label="Transactions" value="list" />
        <Tab label="Payment Requests" value="payment-requests" />
      </Tabs>

      <Outlet />
    </Box>
  );
}
