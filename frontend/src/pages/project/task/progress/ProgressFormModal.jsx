import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function ProgressFormModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    progress: "",
    location: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
    setForm({ date: "", progress: "", location: "", notes: "" });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Progress</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            type="date"
            name="date"
            label="Date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            name="progress"
            label="Progress Quantity (%)"
            type="number"
            value={form.progress}
            onChange={handleChange}
            fullWidth
          />

          {/* <TextField
            select
            name="location"
            label="Location"
            value={form.location}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Velacherry">Velacherry</MenuItem>
            <MenuItem value="Guindy">Guindy</MenuItem>
          </TextField> */}

          <TextField
            name="notes"
            label="Notes"
            multiline
            rows={3}
            value={form.notes}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Progress
        </Button>
      </DialogActions>
    </Dialog>
  );
}
