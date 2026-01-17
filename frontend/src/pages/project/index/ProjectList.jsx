import { Box, Card, Typography, Button, Chip, IconButton } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const navigate = useNavigate();

  /* ---- Dummy Data ---- */
  const rows = [
    {
      id: 1,
      project_code: "PRJ-001",
      project_name: "Metro Rail Construction",
      status: "ONGOING",
    },
    {
      id: 2,
      project_code: "PRJ-002",
      project_name: "Highway Expansion",
      status: "COMPLETED",
    },
    {
      id: 3,
      project_code: "PRJ-003",
      project_name: "Commercial Complex",
      status: "DELAYED",
    },
  ];

  const statusColor = {
    ONGOING: "info",
    COMPLETED: "success",
    DELAYED: "error",
  };
  const columns = [
    {
      field: "project_code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value]}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/projects/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Projects
        </Typography>

        <Button variant="contained" onClick={() => navigate("/projects/add")}>
          + Add Project
        </Button>
      </Box>

      <Card sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          disableRowSelectionOnClick
        />
      </Card>
    </Box>
  );
}
