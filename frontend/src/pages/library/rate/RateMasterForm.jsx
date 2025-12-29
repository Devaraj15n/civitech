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

const RateMasterForm = ({ open, data, onClose, onSave }) => {
  const [form, setForm] = useState({
    item_name: "",
    item_code: "",
    unit: "",
    gst_percentage: 0,
    cost_component: "",
    unit_cost_price: 0,
    markup_percentage: 0,
    additional_fees: 0,
    unit_sale_price: 0
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm({
        item_name: "",
        item_code: "",
        unit: "",
        gst_percentage: 0,
        cost_component: "",
        unit_cost_price: 0,
        markup_percentage: 0,
        additional_fees: 0,
        unit_sale_price: 0
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    // Auto calculate sale price
    if (
      ["unit_cost_price", "markup_percentage", "additional_fees"].includes(
        name
      )
    ) {
      const cost = Number(updated.unit_cost_price || 0);
      const markup =
        (cost * Number(updated.markup_percentage || 0)) / 100;
      const extra = Number(updated.additional_fees || 0);

      updated.unit_sale_price = cost + markup + extra;
    }

    setForm(updated);
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {data ? "Edit Rate" : "Add Rate"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Item Name"
              name="item_name"
              value={form.item_name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Item Code"
              name="item_code"
              value={form.item_code}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={4}>
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
            </TextField>
          </Grid>

          <Grid item size={12} md={4}>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="GST %"
              name="gst_percentage"
              value={form.gst_percentage}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Cost Price"
              name="unit_cost_price"
              value={form.unit_cost_price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Markup %"
              name="markup_percentage"
              value={form.markup_percentage}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Additional Fees"
              name="additional_fees"
              value={form.additional_fees}
              onChange={handleChange}
            />
          </Grid>

          <Grid item size={12} md={6}>
            <TextField
              fullWidth
              label="Sale Price"
              name="unit_sale_price"
              value={form.unit_sale_price}
              InputProps={{ readOnly: true }}
            />
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

export default RateMasterForm;
