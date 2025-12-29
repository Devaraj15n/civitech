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

const CostCodeForm = ({
  open,
  data,
  rows,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState({
    cost_code: "",
    name: "",
    parent_cost_code_id: "",
    cost_component: "",
    description: "",
    status: 1
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        cost_code: "",
        name: "",
        parent_cost_code_id: "",
        cost_component: "",
        description: "",
        status: 1
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      parent_cost_code_id:
        form.parent_cost_code_id || null
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {data ? "Edit Cost Code" : "Add Cost Code"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Cost Code"
              name="cost_code"
              value={form.cost_code}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Cost Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              select
              fullWidth
              label="Parent Cost Code"
              name="parent_cost_code_id"
              value={form.parent_cost_code_id}
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              {rows
                .filter((r) => r.id !== data?.id)
                .map((r) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.cost_code} - {r.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              select
              fullWidth
              label="Cost Component"
              name="cost_component"
              value={form.cost_component}
              onChange={handleChange}
              required
            >
              <MenuItem value="Material">Material</MenuItem>
              <MenuItem value="Labour">Labour</MenuItem>
              <MenuItem value="Equipment">Equipment</MenuItem>
              <MenuItem value="Overhead">Overhead</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
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

export default CostCodeForm;
