import { Box, Tabs, Tab, CircularProgress } from "@mui/material";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../../features/projects/projectSlice";
import ProjectHeader from "./ProjectHeader";

const ALLOWED_TABS = ["overview", "tasks", "boq", "materials", "transactions","attendance"];

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { current: project, loading } = useSelector(
    (s) => s.project
  );

  // console.log("id");
  // console.log(id);
  // console.log("project++++++++++++");
  // console.log(project);
  

  useEffect(() => {
      // console.log("Dispatching fetchProjectById", id);

    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  /**
   * Extract project-level tab
   * /projects/:id/:tab/...
   */
  const currentTab = useMemo(() => {
    const [, , , tab] = location.pathname.split("/");
    return ALLOWED_TABS.includes(tab) ? tab : "overview";
  }, [location.pathname]);

  if (loading || !project) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <ProjectHeader project={project} />

      <Tabs
        value={currentTab}
        onChange={(_, v) => navigate(`/projects/${id}/${v}`)}
        sx={{ borderBottom: "1px solid #e0e0e0", mb: 2 }}
      >
        <Tab label="Overview" value="overview" />
        <Tab label="Tasks" value="tasks" />
        <Tab label="BOQ" value="boq" />
        <Tab label="Materials" value="materials" />
        <Tab label="Transactions" value="transactions" />
        <Tab label="Attendance" value="attendance" />
      </Tabs>

      <Outlet />
    </Box>
  );
}
