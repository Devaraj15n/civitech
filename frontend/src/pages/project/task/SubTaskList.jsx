import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const columns = [
  { field: "sub_task_name", headerName: "Sub Task", flex: 2 },
  {
    field: "progress_percentage",
    headerName: "Progress (%)",
    flex: 1
  }
];

export default function SubTaskList({ subTasks }) {
  if (!subTasks.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No sub tasks added
      </Typography>
    );
  }

  return (
    <Box sx={{ height: 200 }}>
      <DataGrid
        rows={subTasks}
        columns={columns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}
