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

const MaterialLibraryForm = ({
  open,
  data,
  categories,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState({
    material_name: "",
    category_id: "",
    uom: "",
    status: 1
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        material_name: "",
        category_id: "",
        uom: "",
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
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {data ? "Edit Material" : "Add Material"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={12}>
            <TextField
              fullWidth
              label="Material Name"
              name="material_name"
              value={form.material_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12}>
            <TextField
              select
              fullWidth
              label="Category"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.category_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item size={12}>
            <TextField
              fullWidth
              label="UOM"
              name="uom"
              value={form.uom}
              onChange={handleChange}
              placeholder="Eg: Bag, Kg, Nos"
            />
          </Grid>

          <Grid item size={12}>
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

export default MaterialLibraryForm;
