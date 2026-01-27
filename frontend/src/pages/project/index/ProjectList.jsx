import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  IconButton,
  Drawer,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ProjectForm from "./ProjectForm";
import {
  fetchProjects,
  deleteProject,
  saveProject,
} from "../../../features/projects/projectSlice";
import { showSuccess, showError } from "../../../utils/toastHelper";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: rows = [], loading } = useSelector((s) => s.project);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const statusColor = {
    Planning: "info",
    Ongoing: "info",
    Completed: "success",
    Hold: "warning",
  };

  // ✅ Handle save from ProjectForm
  const handleSave = async (data) => {
    try {
      await dispatch(saveProject(data)).unwrap();

      showSuccess({
        data: { message: data.id ? "Project updated successfully" : "Project created successfully" },
      });

      setOpen(false);
      setEditData(null);

      await dispatch(fetchProjects()).unwrap(); // 🔁 refresh table
    } catch (err) {
      showError(err);
    }
  };


  // ✅ Handle delete
  // const handleDelete = async (id) => {
  //   try {
  //     await dispatch(deleteProject(id)).unwrap();

  //     showSuccess({ data: { message: "Project deleted successfully" } });
  //     dispatch(fetchProjects());
  //   } catch (err) {
  //     showError(err);
  //   }
  // };

  const columns = [
    { field: "project_code", headerName: "Code", flex: 1 },
    { field: "project_name", headerName: "Project Name", flex: 2 },
    {
      field: "project_status",
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
          <IconButton
            color="primary"
            onClick={() => {
              setEditData(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          {/* <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </IconButton> */}
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
        alignItems="center"
      >
        <Typography variant="h5" fontWeight={600}>
          Projects
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Project
        </Button>
      </Box>

      <Card sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          loading={loading}
          disableRowSelectionOnClick
        />
      </Card>

      {/* Drawer Form */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        PaperProps={{ sx: { width: 500 } }}
      >
        <ProjectForm
          data={editData}
          onClose={() => {
            setOpen(false);
            setEditData(null);
          }}
          onSave={handleSave} // 🔑 corporate save pattern
        />
      </Drawer>
    </Box>
  );
}
