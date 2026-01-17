import { Box, Tabs, Tab } from "@mui/material";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useMemo } from "react";
import ProjectHeader from "./ProjectHeader";

const ALLOWED_TABS = [
  "overview",
  "tasks",
  "boq",
  "materials",
  "transactions"
];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const project = {
    name: "Residential Apartment – Phase 1",
    code: "PRJ-1023",
    client: "ABC Builders",
    status: "Active",
    startDate: "01 Jan 2025",
    endDate: "30 Dec 2025"
  };

  /**
   * ✅ Always extract ONLY the project-level tab
   * URL format: /projects/:id/:tab/...
   */
  const currentTab = useMemo(() => {
    const [, , , tab] = location.pathname.split("/");
    return ALLOWED_TABS.includes(tab) ? tab : "overview";
  }, [location.pathname]);

  const handleTabChange = (_, value) => {
    navigate(`/projects/${id}/${value}`);
  };

  return (
    <Box>
      <ProjectHeader project={project} />

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          borderBottom: "1px solid #E0E0E0",
          mb: 2,
          minHeight: 44,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "14px",
            minHeight: 44
          }
        }}
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Tasks" value="tasks" />
        <Tab label="BOQ" value="boq" />
        <Tab label="Materials" value="materials" />
        <Tab label="Transactions" value="transactions" />
      </Tabs>

      <Outlet />
    </Box>
  );
}
