import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import { fetchProjects } from "../../../features/projects/projectSlice";
import { useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssessmentIcon from "@mui/icons-material/Assessment";

const statusColor = {
  Planning: "warning",
  Ongoing: "info",
  Completed: "success",
  Hold: "error",
};

export default function ProjectOverview() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { list: projects = [], loading } = useSelector((s) => s.project);

  useEffect(() => {
    if (!projects.length) dispatch(fetchProjects());
  }, [dispatch, projects.length]);

  const project = projects.find((p) => p.id === Number(id));

  if (loading) return <CircularProgress />;

  if (!project) return <Typography>No project found!</Typography>;

  const progress =
    project.project_status === "Completed"
      ? 100
      : project.project_status === "Ongoing"
      ? 60
      : 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Project Overview
      </Typography>

      {/* ---- KPI Cards ---- */}
      <Grid container spacing={3} mb={3} alignItems="stretch">
        {[
          {
            title: "Status",
            icon: <AccessTimeIcon color="primary" />,
            content: (
              <Chip
                label={project.project_status}
                color={statusColor[project.project_status]}
                size="small"
                sx={{ mt: 1 }}
              />
            ),
            borderColor: "#1976d2",
          },
          {
            title: "Project Value",
            icon: <MonetizationOnIcon color="success" />,
            content: (
              <Typography variant="h6" color="primary" mt={1}>
                {project.project_value
                  ? `₹ ${Number(project.project_value).toLocaleString()}`
                  : "N/A"}
              </Typography>
            ),
            borderColor: "#4caf50",
          },
          {
            title: "Address",
            icon: <LocationOnIcon color="warning" />,
            content: <Typography mt={1}>{project.project_address || "N/A"}</Typography>,
            borderColor: "#f57c00",
          },
          {
            title: "Progress",
            icon: <AssessmentIcon color="secondary" />,
            content: (
              <>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ mt: 1, height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" mt={1}>
                  {progress}%
                </Typography>
              </>
            ),
            borderColor: "#9c27b0",
          },
        ].map((card, index) => (
          <Grid item size ={{xs:12, sm:6, md:3}} key={index}>
            <Paper
              elevation={3}
              sx={{ p: 3, borderLeft: `5px solid ${card.borderColor}`, height: "100%" }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                {card.icon}
                <Typography variant="subtitle1" fontWeight={600}>
                  {card.title}
                </Typography>
              </Stack>
              {card.content}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ---- Detailed Info ---- */}
      <Grid container spacing={3} alignItems="stretch">
        <Grid item size={{xs:12, md:6}}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Project Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><b>Project Code:</b> {project.project_code}</Typography>
            <Typography><b>Project Name:</b> {project.project_name}</Typography>
            <Typography><b>Client:</b> {project.client_name || "N/A"}</Typography>
            <Typography><b>Start Date:</b> {project.start_date}</Typography>
            <Typography><b>End Date:</b> {project.end_date}</Typography>
          </Paper>
        </Grid>

        <Grid item size={{xs:12, md:6}}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" mb={2}>
              Site Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><b>Orientation:</b> {project.orientation || "N/A"}</Typography>
            <Typography><b>Dimension:</b> {project.dimension || "N/A"}</Typography>
            <Typography><b>Attendance Radius:</b> {project.attendance_radius || "N/A"}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
