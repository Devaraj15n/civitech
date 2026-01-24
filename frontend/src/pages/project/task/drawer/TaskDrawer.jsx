import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  saveTask,
  fetchTasks,
} from "../../../../features/projects/tasks/taskSlice";
import { showSuccess, showError } from "../../../../utils/toastHelper";

export default function TaskDrawer({
  open,
  onClose,
  parentTask,
  projectId,
  editData,
}) {
  console.log("projectId=================");
  console.log(projectId);
  
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth || {});

  const [form, setForm] = useState({
    task_name: "",
    duration_days: "",
    start_date: "",
    end_date: "",
    assigned_to: "",
    task_status: "Pending",
    status: 1,
  });

  // Initialize form for edit
  useEffect(() => {
    if (editData) {
      setForm({
        task_name: editData.task_name || "",
        duration_days: editData.duration_days || "",
        start_date: editData.start_date || "",
        end_date: editData.end_date || "",
        assigned_to: editData.assigned_to || "",
        task_status: editData.task_status || "Pending",
        status: editData.status || 1,
      });
    } else {
      setForm({
        task_name: "",
        duration_days: "",
        start_date: "",
        end_date: "",
        assigned_to: "",
        task_status: "Pending",
        status: 1,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.task_name || !form.duration_days) {
      showError("Task Name and Duration are required");
      return;
    }

    const payload = {
      project_id: projectId, // ✅ include project_id here
      task_name: form.task_name,
      start_date: form.start_date,
      end_date: form.end_date,
      duration_days: Number(form.duration_days),
      assigned_to: Number(form.assigned_to) || user?.id || 1, // ✅ fallback to current user if not selected
      task_status: form.task_status,
      status: 1,
      created_by: user?.id || 1,
      updated_by: user?.id || 1,
      id: editData?.id, // include id if editing
    };


    console.log("payload");
    console.log(payload);
    try {
      await dispatch(saveTask(payload)).unwrap();
      showSuccess({
        data: {
          message: editData
            ? "Task updated successfully"
            : "Task created successfully",
        },
      });

      // Refresh task list
      dispatch(fetchTasks(projectId));
      onClose();
    } catch (err) {
      showError(err);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 420 } }}
    >
      {/* Header */}
      <Box
        px={3}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="4px solid #6C5CE7"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography fontWeight={700}>
            {editData ? "EDIT TASK" : "ADDING TASK"}
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>

      {/* Body */}
      <Box p={3}>
        <Stack spacing={3}>
          <TextField
            label="Task Name *"
            name="task_name"
            value={form.task_name}
            onChange={handleChange}
            fullWidth
            placeholder="Enter task name"
          />

          <TextField
            label="Duration (days) *"
            name="duration_days"
            type="number"
            value={form.duration_days}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarTodayOutlinedIcon sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarTodayOutlinedIcon sx={{ mr: 1 }} />,
              }}
            />
          </Stack>

          <TextField
            label="Assign To"
            name="assigned_to"
            type="number"
            value={form.assigned_to}
            onChange={handleChange}
            fullWidth
            placeholder="Enter user ID"
          />

          <TextField
            label="Task Status"
            name="task_status"
            select
            value={form.task_status}
            onChange={handleChange}
            fullWidth
          >
            {["Pending", "Ongoing", "Completed", "Hold"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Box>
    </Drawer>
  );
}
