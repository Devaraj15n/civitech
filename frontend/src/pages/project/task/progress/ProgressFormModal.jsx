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
  fetchTaskProgress,
} from "../../../../features/projects/progress/progressSlice";

import { showSuccess, showError } from "../../../../utils/toastHelper";

export default function ProgressFormModal({
  open,
  onClose,
  projectId,
  taskId,
  isSubtask = false,
  editData,
  parentTaskId, // optional: for updating main task after subtask progress
}) {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.progress.loading);

  const [form, setForm] = useState({
    progress_date: new Date().toISOString().slice(0, 10),
    progress_quantity: "",
    remarks: "",
    files: [],
  });

  // Initialize form
  useEffect(() => {
    if (editData) {
      setForm({
        progress_date: editData.progress_date,
        progress_quantity: editData.progress_quantity,
        remarks: editData.remarks || "",
        files: [], // reset files, cannot prefill
      });
    } else if (open) {
      setForm({
        progress_date: new Date().toISOString().slice(0, 10),
        progress_quantity: "",
        remarks: "",
        files: [],
      });
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      files: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async () => {
    // if (!form.progress_quantity) return showError("Progress quantity is required");
    // if (!projectId || !taskId) return showError("Project ID or Task ID missing");

    try {
      const result = await dispatch(
        saveProgress({
          data: {
            id: editData?.id,
            project_id: projectId,
            task_id: taskId,
            progress_date: form.progress_date,
            progress_quantity: Number(form.progress_quantity),
            progress_percentage: Number(form.progress_quantity),
            remarks: form.remarks || null,
            files: form.files,
          },
          isSubtask,
        })
      ).unwrap();


      // ✅ Refetch using correct key
      dispatch(fetchProgress({ taskId, isSubtask }));

      // ✅ If subtask, update main task aggregated progress
      if (isSubtask && parentTaskId) {
        dispatch(fetchTaskProgress({ taskId: parentTaskId }));
      }

      showSuccess({
        data: {
          message: editData ? "Progress updated successfully" : "Progress added successfully",
        },
      });

      onClose();
      setForm((prev) => ({ ...prev, files: [] }));
    } catch (err) {
      console.error("Save Progress Error:", err);
      // showError(err.response?.data || "Something went wrong");
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
            inputProps={{ min: 0, max: 100 }}
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

          {/* FILE UPLOAD */}
          <Box>
            <Button variant="outlined" component="label" fullWidth>
              Upload Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileChange}
              />
            </Button>
            {form.files.length > 0 && (
              <Stack mt={1} spacing={0.5}>
                {form.files.map((file, idx) => (
                  <Typography key={idx} variant="body2">
                    {file.name}
                  </Typography>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
