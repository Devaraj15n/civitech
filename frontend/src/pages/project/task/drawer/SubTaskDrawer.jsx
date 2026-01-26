import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  saveSubTask,
  fetchSubTasks,
} from "../../../../features/projects/subtasks/subTaskSlice";
import { showSuccess, showError } from "../../../../utils/toastHelper";

export default function SubTaskDrawer({ open, onClose, parentTask }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth || {});

  const [form, setForm] = useState({
    sub_task_name: "",
    duration_days: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.sub_task_name) {
      showError("Sub task name is required");
      return;
    }

    try {
      await dispatch(
        saveSubTask({
          task_id: parentTask.id, // 🔥 KEY DIFFERENCE
          ...form,
          created_by: user?.id || 1,
          updated_by: user?.id || 1,
        })
      ).unwrap();

      showSuccess({ data: { message: "Subtask created successfully" } });

      dispatch(fetchSubTasks(parentTask.id));
      onClose();
    } catch (err) {
      showError(err);
    }
  };

  if (!parentTask) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width={420}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontWeight={700}>
            Add Subtask → {parentTask.task_name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={3}>
          <TextField
            label="Sub Task Name"
            name="sub_task_name"
            value={form.sub_task_name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Duration (days)"
            name="duration_days"
            type="number"
            value={form.duration_days}
            onChange={handleChange}
          />

          <TextField
            label="Start Date"
            name="start_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.start_date}
            onChange={handleChange}
          />

          <TextField
            label="End Date"
            name="end_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.end_date}
            onChange={handleChange}
          />

          {/* <TextField
            label="Quantity *"
            name="quantity"
            type="number" // ✅ ensures only numbers
            value={form.quantity}
            onChange={handleChange}
            fullWidth
            inputProps={{
              min: 0, // optional: prevent negative numbers
              step: 1, // optional: integer steps
            }}
          />
          <TextField
            label="Unit *"
            name="unit"
            select
            value={form.unit}
            onChange={handleChange}
            fullWidth
          >
            {["%","kg", "ltr", "pcs", "bag", "m", "m²", "m³", "ton", "box"].map(
              (unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              )
            )}
          </TextField> */}

          <TextField
            label="Notes"
            name="notes"
            multiline
            rows={3}
            value={form.notes}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Save Subtask
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
