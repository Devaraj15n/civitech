import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Divider,
  Stack
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function TaskDrawer({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 420 }
      }}
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
            ADDING TASK
          </Typography>
        </Box>

        <Button variant="contained">
          Save
        </Button>
      </Box>

      {/* Body */}
      <Box p={3}>
        <Stack spacing={3}>
          {/* Task Name */}
          <TextField
            label="TASK NAME *"
            fullWidth
            placeholder="Enter task name"
          />

          {/* Duration */}
          <TextField
            label="DURATION (DAYS) *"
            fullWidth
            placeholder="Enter duration"
          />

          {/* Dates */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              fullWidth
              placeholder="Select Date"
              InputProps={{
                startAdornment: <CalendarTodayOutlinedIcon sx={{ mr: 1 }} />
              }}
            />
            <TextField
              label="End Date"
              fullWidth
              placeholder="Select Date"
              InputProps={{
                startAdornment: <CalendarTodayOutlinedIcon sx={{ mr: 1 }} />
              }}
            />
          </Stack>

          {/* Est Quantity & Unit */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="EST QUANTITY"
              fullWidth
              defaultValue="100"
            />
            <TextField
              label="UNIT"
              select
              fullWidth
              defaultValue="%"
            >
              <MenuItem value="%">%</MenuItem>
              <MenuItem value="Nos">Nos</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
            </TextField>
          </Stack>

          {/* Tag */}
          <TextField
            label="TAG"
            select
            fullWidth
            defaultValue=""
          >
            <MenuItem value="">Add Tag</MenuItem>
          </TextField>

          {/* Assign To */}
          <TextField
            label="ASSIGN TO"
            fullWidth
            placeholder="Select user"
          />

          {/* Upload */}
          <Box
            mt={2}
            p={3}
            border="1px dashed #C7C7F4"
            borderRadius={2}
            textAlign="center"
            color="primary.main"
            sx={{ cursor: "pointer" }}
          >
            <CloudUploadOutlinedIcon fontSize="large" />
            <Typography mt={1}>
              Upload Files
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}
