import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

/* ---- Sample Data ---- */
const projectSummary = [
  { title: "Total Projects", value: 12, color: "#1976d2" },
  { title: "Ongoing Projects", value: 7, color: "#0288d1" },
  { title: "Completed Projects", value: 4, color: "#2e7d32" },
  { title: "Delayed Projects", value: 1, color: "#d32f2f" }
];

const monthlyProgress = [
  { month: "Jan", progress: 40 },
  { month: "Feb", progress: 55 },
  { month: "Mar", progress: 70 },
  { month: "Apr", progress: 85 }
];

const projectStatus = [
  { name: "Ongoing", value: 7 },
  { name: "Completed", value: 4 },
  { name: "Delayed", value: 1 }
];

const COLORS = ["#0288d1", "#2e7d32", "#d32f2f"];

const Dashboard = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" mb={3} fontWeight={600}>
        Project Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} mb={3}>
        {projectSummary.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                color: "#fff"
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2}>
        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography mb={2} fontWeight={600}>
                Monthly Project Progress (%)
              </Typography>

              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProgress}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="progress"
                      fill="#1976d2"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography mb={2} fontWeight={600}>
                Project Status
              </Typography>

              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatus}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                    >
                      {projectStatus.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Simple Legend */}
              <Box mt={2}>
                {projectStatus.map((item, index) => (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 0.5
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: COLORS[index],
                        borderRadius: "50%",
                        mr: 1
                      }}
                    />
                    <Typography variant="body2">
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
