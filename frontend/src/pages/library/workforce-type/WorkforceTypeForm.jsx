import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WorkforceTypeForm = ({ open, data, onClose, onSave }) => {
  const { user } = useSelector((s) => s.auth || {}); // For client_id, created_by

  const [form, setForm] = useState({
    worker_type: "",
    employment_type: "Daily",
    salary_per_hour: 0,
    status: 1
  });

  // Initialize form for edit/add
  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        employment_type: data.employment_type || "Daily",
        status: data.status ?? 1
      });
    } else {
      setForm({
        worker_type: "",
        employment_type: "Daily",
        salary_per_hour: 0,
        status: 1
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "salary_per_hour" ? Number(value) : value });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      client_id: user?.client_id || 1,
      created_by: user?.id || 1,
      updated_by: user?.id || 1
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data ? "Edit Workforce Type" : "Add Workforce Type"}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={12}>
            <TextField
              fullWidth
              label="Worker Type"
              name="worker_type"
              value={form.worker_type}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              select
              fullWidth
              label="Employment Type"
              name="employment_type"
              value={form.employment_type}
              onChange={handleChange}
              required
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Hourly">Hourly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Salary per Hour"
              name="salary_per_hour"
              value={form.salary_per_hour}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkforceTypeForm;
