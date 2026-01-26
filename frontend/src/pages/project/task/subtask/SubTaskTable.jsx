import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubTasks,
  deleteSubTask,
} from "../../../../features/projects/subtasks/subTaskSlice";

export default function SubTaskTable({ taskId, onOpenProgress }) {
  const dispatch = useDispatch();

  const { byTask, loading } = useSelector((s) => s.projectSubTask);
  const subTasks = byTask[taskId];

  useEffect(() => {
    if (!subTasks) {
      dispatch(fetchSubTasks(taskId));
    }
  }, [dispatch, taskId, subTasks]);

  if (loading && !subTasks) {
    return (
      <Typography align="center" sx={{ p: 2 }}>
        <CircularProgress size={20} />
      </Typography>
    );
  }

  if (!subTasks?.length) {
    return (
      <Typography variant="body2" sx={{ p: 2, color: "text.secondary" }}>
        No subtasks available
      </Typography>
    );
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>SNo</TableCell>
          <TableCell>Sub Task</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Start</TableCell>
          <TableCell>End</TableCell>
          <TableCell>Progress</TableCell>
          <TableCell width={60} />
        </TableRow>
      </TableHead>

      <TableBody>
        {subTasks.map((st,index) => (
          <TableRow key={st.id} hover>
            <TableCell>{++index}</TableCell>
            <TableCell>{st.sub_task_name}</TableCell>
            <TableCell>{st.duration_days}</TableCell>
            <TableCell>{st.start_date}</TableCell>
            <TableCell>{st.end_date}</TableCell>

            <TableCell>
              <Chip
                size="small"
                label={`${st.progress_percentage || 0}%`}
                clickable
                onClick={() => onOpenProgress(st)}
              />
            </TableCell>

            <TableCell>
              <IconButton
                size="small"
                color="error"
                onClick={() => dispatch(deleteSubTask(st.id))}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
