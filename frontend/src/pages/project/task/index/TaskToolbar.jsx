import {
  Box,
  Button,
  MenuItem,
  Select
} from "@mui/material";

export default function TaskToolbar({onAddTask}) {
  return (
    <Box
      display="flex"
      alignItems="end"
      justifyContent="end"
      mb={2}
      gap={2}
    >
      {/* <Box display="flex" gap={2}>
        <Select size="small" defaultValue="">
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
        </Select>

        <Select size="small" defaultValue="">
          <MenuItem value="">Assignee</MenuItem>
        </Select>

        <Select size="small" defaultValue="">
          <MenuItem value="">Tag</MenuItem>
        </Select>
      </Box> */}

      <Box display="flex" gap={2}>
        {/* <Button variant="outlined">Create Baseline</Button>
        <Button variant="outlined" color="error">
          Refresh Date
        </Button> */}
        {/* <Button variant="outlined">Download</Button> */}
        {/* 🔑 This button opens drawer */}
        <Button
          variant="contained"
          onClick={onAddTask}
        >
          + Add Task
        </Button>
      </Box>
    </Box>
  );
}
