import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveProject, fetchProjects } from "../../../features/projects/projectSlice";

export default function ProjectForm({ data, onClose, onSave }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth || {}); // for client_id, created_by

  const [form, setForm] = useState({
    project_name: "",
    project_code: "",
    start_date: "",
    end_date: "",
    status: 1,
    project_value: "",
    project_address: "",
    orientation: "",
    dimension: "",
    attendance_radius: "",
    project_status: "Planning",
  });

  // Initialize form for edit
  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        attendance_radius: data.attendance_radius || "",
        project_value: data.project_value || "",
      });
    } else {
      setForm({
        project_name: "",
        project_code: "",
        start_date: "",
        end_date: "",
        status: 1,
        project_value: "",
        project_address: "",
        orientation: "",
        dimension: "",
        attendance_radius: "",
        project_status: "Planning",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     ...form,
  //     client_id: user?.client_id || 1,
  //     created_by: user?.id || 1,
  //     updated_by: user?.id || 1,
  //     project_value: form.project_value ? Number(form.project_value) : 0,
  //     attendance_radius: form.attendance_radius ? Number(form.attendance_radius) : 0,
  //     status: Number(form.status),
  //     id: data?.id, // include id if editing
  //   };

  //   // dispatch(saveProject(payload)); // ✅ slice-friendly
  //   // if (onSave) onSave(payload);
  //   // onClose();

  //   try {
  //     await dispatch(saveProject(payload)).unwrap();
  //     showSuccess({
  //       data: {
  //         message: data
  //           ? "Project updated successfully"
  //           : "Project created successfully",
  //       },
  //     });

  //     await dispatch(fetchProjects()).unwrap();
  //     onClose();
  //   } catch (err) {
  //     console.error("Save failed", err);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      client_id: user?.client_id || 1,
      created_by: user?.id || 1,
      updated_by: user?.id || 1,
      project_value: form.project_value ? Number(form.project_value) : 0,
      attendance_radius: form.attendance_radius
        ? Number(form.attendance_radius)
        : 0,
      status: Number(form.status),
      id: data?.id,
    };

    // ✅ ONLY THIS
    onSave(payload);
  };


  return (
    <Box component="form" p={3} onSubmit={handleSubmit}>
      <Typography variant="h6" mb={2}>
        {data ? "Edit Project" : "Add Project"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            label="Project Code"
            name="project_code"
            value={form.project_code}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            label="Project Name"
            name="project_name"
            value={form.project_name}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            label="Project Value"
            name="project_value"
            type="number"
            value={form.project_value}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={12} md={6}>
          <TextField
            fullWidth
            select
            label="Project Status"
            name="project_status"
            value={form.project_status}
            onChange={handleChange}
          >
            {["Planning", "Ongoing", "Completed", "Hold"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Project Address"
            name="project_address"
            value={form.project_address}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={12} md={4}>
          <TextField
            fullWidth
            label="Orientation"
            name="orientation"
            value={form.orientation}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={12} md={4}>
          <TextField
            fullWidth
            label="Dimension"
            name="dimension"
            value={form.dimension}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={12} md={4}>
          <TextField
            fullWidth
            type="number"
            label="Attendance Radius"
            name="attendance_radius"
            value={form.attendance_radius}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {data ? "Update" : "Add"}
        </Button>
      </Box>
    </Box>
  );
}
