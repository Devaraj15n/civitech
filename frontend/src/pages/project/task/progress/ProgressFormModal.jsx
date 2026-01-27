import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import {
  saveProgress,
  fetchProgress,
} from "../../../../features/projects/progress/progressSlice";

import { showSuccess, showError } from "../../../../utils/toastHelper";

export default function ProgressFormModal({
  open,
  onClose,
  projectId,
  taskId,
  editData,
}) {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.progress.loading);

  const [form, setForm] = useState({
    progress_date: new Date().toISOString().slice(0, 10),
    progress_quantity: "",
    remarks: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        progress_date: editData.progress_date,
        progress_quantity: editData.progress_quantity,
        remarks: editData.remarks || "",
      });
    } else if (open) {
      setForm({
        progress_date: new Date().toISOString().slice(0, 10),
        progress_quantity: "",
        remarks: "",
      });
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    if (form.progress_quantity === "") {
      showError("Progress quantity is required");
      return;
    }

    try {
      await dispatch(
        saveProgress({
          id: editData?.id,
          project_id: projectId,
          task_id: taskId,
          progress_date: form.progress_date,
          progress_quantity: Number(form.progress_quantity),
          progress_percentage: Number(form.progress_quantity),
          remarks: form.remarks || null,
        })
      ).unwrap();

      dispatch(fetchProgress(taskId));

      showSuccess({
        data: {
          message: editData
            ? "Progress updated successfully"
            : "Progress added successfully",
        },
      });

      onClose();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        px={3}
        py={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="4px solid #6C5CE7"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography fontWeight={700}>
            {editData ? "EDIT PROGRESS" : "ADD PROGRESS"}
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </Box>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <TextField
            type="date"
            name="progress_date"
            label="Progress Date"
            value={form.progress_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            name="progress_quantity"
            label="Progress Quantity (%)"
            type="number"
            value={form.progress_quantity}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="remarks"
            label="Remarks"
            multiline
            rows={3}
            value={form.remarks}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
