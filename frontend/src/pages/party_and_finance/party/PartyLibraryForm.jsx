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

const EMPTY_FORM = {
  id: null,
  party_name: "",
  party_type_id: "",
  mobile: "",
  email: "",
  gst_no: "",
  status: 1
};

const PartyLibraryForm = ({
  open,
  data,
  partyTypes,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState(EMPTY_FORM);

  /* ✅ FIX: map API → form + depend on open */
  useEffect(() => {
    if (open && data) {
      setForm({
        id: data.id,
        party_name: data.party_name || "",
        party_type_id: Number(data.party_type_id),
        mobile: data.phone || "",
        email: data.email || "",
        gst_no: data.gst_number || "",
        status: Number(data.status ?? 1)
      });
    }

    if (open && !data) {
      setForm(EMPTY_FORM);
    }
  }, [data, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "party_type_id" || name === "status"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = () => {
    onSave(form); // ❌ don't close here
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      key={form.id || "add"} // ✅ force refresh
    >
      <DialogTitle>
        {form.id ? "Edit Party" : "Add Party"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid  size={{xs:12 ,md:6}}>
            <TextField
              fullWidth
              label="Party Name"
              name="party_name"
              value={form.party_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid  size={{xs:12 ,md:6}}>
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

          <Grid  size={{xs:12 ,md:6}}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          <Grid  size={{xs:12 ,md:6}}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid  size={{xs:12 ,md:6}}>
            <TextField
              fullWidth
              label="GST No"
              name="gst_no"
              value={form.gst_no}
              onChange={handleChange}
            />
          </Grid>

          <Grid  xs={12} md={6}>
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
