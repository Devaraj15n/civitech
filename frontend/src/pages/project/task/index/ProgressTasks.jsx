import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgress,
  clearProgress,
  fetchTaskProgress,
} from "../../../../features/projects/progress/progressSlice";
import ProgressFormModal from "./ProgressFormModal";

export default function ProgressTasks({ open, onClose, task }) {
  const dispatch = useDispatch();
  const progressList = useSelector((s) => s.progress.list);
  const mainProgress = useSelector((s) => s.progress.mainTaskProgress);
  const loading = useSelector((s) => s.progress.loading);

  const [openModal, setOpenModal] = useState(false);

  const isSubtask = !!task?.parentTaskId;

  // Fetch progress when task changes or drawer opens
  useEffect(() => {
    if (task?.id) {
      dispatch(clearProgress());
      dispatch(fetchProgress({ taskId: task.id, isSubtask }));
      if (isSubtask && task.parentTaskId) {
        dispatch(fetchTaskProgress(task.parentTaskId));
      }
    }
  }, [dispatch, task?.id]);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: 480 } }}
      >
        <Box p={3} height="100%" display="flex" flexDirection="column">
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{task?.name || "Progress"}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {mainProgress || 0} / 100 % Progress
          </Typography>

          {/* Body */}
          <Box flex={1} overflow="auto">
            {loading && <CircularProgress />}

            {!loading && progressList.length === 0 && (
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                color="text.secondary"
              >
                <TrendingUpIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography>No Progress Update Added</Typography>
              </Box>
            )}

            {progressList.map((p) => (
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
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Progress Modal */}
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
