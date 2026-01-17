import { Card, Typography, Grid, Chip, Divider } from "@mui/material";

/* ---- Dummy Project Data (UI only) ---- */
const project = {
  project_code: "PRJ-001",
  project_name: "Metro Rail Construction",
  client: "ABC Infra Pvt Ltd",
  status: "Ongoing",
  start_date: "2024-01-10",
  end_date: "2025-06-30",
  project_value: "₹ 125,00,00,000",
  project_address: "MG Road, Bangalore",
  orientation: "East - West",
  dimension: "2.5 Km Length",
  attendance_radius: "200 meters"
};

const statusColor = {
  Planning: "warning",
  Ongoing: "info",
  Completed: "success",
  Hold: "error"
};

export default function ProjectOverview() {
  return (
    <Grid container spacing={2}>
      {/* Project Summary */}
      <Grid  size={{ xs: 12, md: 6 }}>
        <Card sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Project Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography><b>Project Code:</b> {project.project_code}</Typography>
          <Typography><b>Project Name:</b> {project.project_name}</Typography>
          <Typography><b>Client:</b> {project.client}</Typography>

          <Chip
            label={project.status}
            color={statusColor[project.status]}
            size="small"
            sx={{ mt: 1 }}
          />
        </Card>
      </Grid>

      {/* Timeline */}
      <Grid  size={{ xs: 12, md: 3 }}>
        <Card sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Timeline
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography><b>Start Date:</b> {project.start_date}</Typography>
          <Typography><b>End Date:</b> {project.end_date}</Typography>
        </Card>
      </Grid>

      {/* Financials */}
      <Grid  size={{ xs: 12, md: 3 }}>
        <Card sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Financials
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography><b>Project Value:</b></Typography>
          <Typography color="primary" fontWeight={600}>
            {project.project_value}
          </Typography>
        </Card>
      </Grid>

      {/* Site Details */}
      <Grid  size={{ xs: 12 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Site Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography><b>Address:</b> {project.project_address}</Typography>
          <Typography><b>Orientation:</b> {project.orientation}</Typography>
          <Typography><b>Dimension:</b> {project.dimension}</Typography>
          <Typography><b>Attendance Radius:</b> {project.attendance_radius}</Typography>
        </Card>
      </Grid>
    </Grid>
  );
}
