import {
  Card,
  Typography,
  Box,
  Chip,
  Divider,
  Button
} from "@mui/material";
import SubTaskList from "../SubTaskList";

const statusColor = {
  Pending: "warning",
  "In Progress": "info",
  Completed: "success"
};

export default function TaskCard({ task }) {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      {/* Task Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6">
            {task.task_name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {task.start_date} → {task.end_date}
          </Typography>
        </Box>

        <Chip
          label={task.status}
          color={statusColor[task.status]}
          size="small"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Sub Tasks */}
      <SubTaskList subTasks={task.sub_tasks} />

      <Box mt={2}>
        <Button size="small">+ Add Sub Task</Button>
      </Box>
    </Card>
  );
}
