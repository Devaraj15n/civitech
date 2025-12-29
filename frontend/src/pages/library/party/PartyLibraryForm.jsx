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

const PartyLibraryForm = ({
  open,
  data,
  partyTypes,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState({
    party_name: "",
    party_type_id: "",
    mobile: "",
    email: "",
    gst_no: "",
    status: 1
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        party_name: "",
        party_type_id: "",
        mobile: "",
        email: "",
        gst_no: "",
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {data ? "Edit Party" : "Add Party"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Party Name"
              name="party_name"
              value={form.party_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              select
              fullWidth
              label="Party Type"
              name="party_type_id"
              value={form.party_type_id}
              onChange={handleChange}
              required
            >
              {partyTypes.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.party_type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="GST No"
              name="gst_no"
              value={form.gst_no}
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

export default PartyLibraryForm;
