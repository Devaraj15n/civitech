import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../features/dashboard/dashboardSlice";

const COLORS = ["#0288d1", "#2e7d32", "#f9a825", "#d32f2f"];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary, statusChart, loading } = useSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading || !summary) {
    return <Typography>Loading dashboard...</Typography>;
  }

  /* 🔹 KPI Cards from DB */
  const projectSummary = [
    { title: "Total Projects", value: summary.total, color: "#1976d2" },
    { title: "Ongoing Projects", value: summary.ongoing, color: "#0288d1" },
    { title: "Completed Projects", value: summary.completed, color: "#2e7d32" },
    { title: "Delayed Projects", value: summary.delayed, color: "#d32f2f" },
  ];

  /* 🔹 Convert API statusChart to Recharts format */
  const pieData = statusChart.map((item) => ({
    name: item.project_status,
    value: item.count,
  }));

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
                color: "#fff",
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

      {/* Pie Chart */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography mb={2} fontWeight={600}>
                Project Status
              </Typography>

              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                    >
                      {pieData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Legend */}
              <Box mt={2}>
                {pieData.map((item, index) => (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        backgroundColor: COLORS[index % COLORS.length],
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2">
                      {item.name} ({item.value})
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
