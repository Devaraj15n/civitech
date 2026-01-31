import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProgressFormModal from "./ProgressFormModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgress } from "../../../../features/projects/progress/progressSlice";
import { fetchTaskProgress } from "../../../../features/projects/progress/progressSlice";

export default function ProgressDrawer({ open, onClose, task }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.progress.byTask[task?.id] || []);
  const loading = useSelector((state) => state.progress.loading);

  const [openModal, setOpenModal] = useState(false);

  const isSubTask = !!task?.parentTaskId;
  

  useEffect(() => {
    if (open && task?.id) {
      dispatch(fetchProgress({ taskId: task.id, isSubtask: isSubTask }));

      if (isSubTask && task?.parentTaskId) {
        dispatch(fetchTaskProgress(task.parentTaskId));
      }
    }
  }, [dispatch, open, task?.id, isSubTask, task?.parentTaskId]);


  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: 520 } }}
      >
        <Box p={3} height="100%" display="flex" flexDirection="column">
          {/* Header */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {isSubTask ? task?.sub_task_name : task?.task_name || "Task"}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Body */}
          <Box flex={1} overflow="auto">
            {loading && <CircularProgress />}
            {!loading && list.length === 0 && (
              <Typography color="text.secondary" align="center" mt={4}>
                No Progress Update Added
              </Typography>
            )}
            {list.map((p) => (
              <Box
                key={p.id}
                sx={{ p: 2, mb: 1, borderRadius: 2, bgcolor: "#f5f5f5" }}
              >
                <Typography fontWeight={600}>{p.progress_quantity}%</Typography>
                <Typography variant="body2">{p.remarks}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {p.progress_date}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Footer */}
          <Box>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Modal */}
      <ProgressFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        projectId={task?.project_id || null}
        taskId={task?.id || null}
        isSubtask={isSubTask}
        parentTaskId={task?.parentTaskId || null}
      />
    </>
  );
}
