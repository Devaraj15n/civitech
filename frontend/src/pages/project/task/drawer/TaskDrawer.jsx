import Select from "react-select";
import { useState, useEffect, useMemo } from "react";
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

import { fetchParties } from "../../../../features/masters/party/partySlice";
import { fetchPartyTypes } from "../../../../features/masters/partyType/partyTypeSlice";
import { showSuccess, showError } from "../../../../utils/toastHelper";

export default function TaskDrawer({ open, onClose, projectId, editData }) {
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth || {});
  const { list: parties = [] } = useSelector((s) => s.party);
  const { list: partyTypes = [] } = useSelector((s) => s.partyType);

  // console.log("parties");
  // console.log(parties);

  /* ---------------- Party Type Map ---------------- */
  const partyTypeMap = useMemo(() => {
    const map = {};
    partyTypes.forEach((p) => {
      map[p.id] = p.party_type;
    });
    return map;
  }, [partyTypes]);

  /* ---------------- Form State ---------------- */
  const [form, setForm] = useState({
    task_name: "",
    duration_days: "",
    start_date: "",
    end_date: "",
    quantity: "",
    unit: "",
    assigned_to: [],
    task_status: "Pending",
    status: 1,
  });

  useEffect(() => {
    dispatch(fetchParties());
    dispatch(fetchPartyTypes()); // if party types are dynamic
  }, [dispatch]);

  /* ---------------- Edit Mode Init ---------------- */
  useEffect(() => {
    if (editData) {
      setForm({
        task_name: editData.task_name || "",
        duration_days: editData.duration_days || "",
        start_date: editData.start_date || "",
        end_date: editData.end_date || "",
        quantity: editData.quantity || "",
        unit: editData.unit || "",
        assigned_to: Array.isArray(editData.assigned_to)
          ? editData.assigned_to
          : [],
        task_status: editData.task_status || "Pending",
        status: editData.status || 1,
      });
    } else {
      setForm({
        task_name: "",
        duration_days: "",
        start_date: "",
        end_date: "",
        quantity: "",
        unit: "",
        assigned_to: [],
        task_status: "Pending",
        status: 1,
      });
    }
  }, [editData]);

  /* ---------------- Handlers ---------------- */
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
      project_id: projectId,
      task_name: form.task_name,
      start_date: form.start_date,
      end_date: form.end_date,
      quantity: form.quantity,
      unit: form.unit,
      duration_days: Number(form.duration_days),
      assigned_to: form.assigned_to, // ✅ ARRAY
      task_status: form.task_status,
      status: 1,
      created_by: user?.id,
      updated_by: user?.id,
      id: editData?.id,
    };

    try {
      await dispatch(saveTask(payload)).unwrap();

      showSuccess({
        data: {
          message: editData
            ? "Task updated successfully"
            : "Task created successfully",
        },
      });

      dispatch(fetchTasks(projectId));
      onClose();
    } catch (err) {
      showError(err);
    }
  };

  // Transform parties for React Select
  const partyOptions = parties.map((p) => ({
    value: p.id,
    label: p.party_name,
    partyType: partyTypeMap[p.party_type_id] || "—", // Add party type here
  }));

  /* ---------------- UI ---------------- */
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
          </TextField>

          <Select
            options={partyOptions}
            isMulti
            value={partyOptions.filter((o) =>
              form.assigned_to.includes(o.value)
            )}
            onChange={(selected) =>
              setForm({
                ...form,
                assigned_to: selected.map((s) => s.value),
              })
            }
            placeholder="Select parties..."
            formatOptionLabel={(option) => (
              <div>
                <div style={{ fontWeight: 500 }}>{option.label}</div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {option.partyType}
                </div>
              </div>
            )}
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
