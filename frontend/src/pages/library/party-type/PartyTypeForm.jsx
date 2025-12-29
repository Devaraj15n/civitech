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

const PartyTypeForm = ({ open, data, onClose, onSave }) => {
  const [form, setForm] = useState({
    party_type: "",
    status: 1
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        party_type: "",
        status: 1
      });
    }
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
        {data ? "Edit Party Type" : "Add Party Type"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          label="Party Type"
          name="party_type"
          value={form.party_type}
          onChange={handleChange}
          margin="normal"
          required
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

export default PartyTypeForm;
