import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

const MaterialCategoryForm = ({ open, data, onClose, onSave }) => {
  const [form, setForm] = useState({
    category_name: "",
    description: "",
    status: 1
  });

  useEffect(() => {
    if (data) setForm(data);
    else
      setForm({
        category_name: "",
        description: "",
        status: 1
      });
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {data ? "Edit Material Category" : "Add Material Category"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          label="Category Name"
          name="category_name"
          value={form.category_name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={0}>Inactive</MenuItem>
        </TextField>
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

export default MaterialCategoryForm;
