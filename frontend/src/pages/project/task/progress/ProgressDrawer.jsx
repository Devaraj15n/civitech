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
import { fetchProgress, clearProgress } from "../../../../features/projects/progress/progressSlice";

export default function ProgressDrawer({ open, onClose, task }) {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.progress.list);
  const loading = useSelector((state) => state.progress.loading);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (task?.id) {
      dispatch(clearProgress());
      dispatch(fetchProgress(task.id));
    }
  }, [dispatch, task?.id]);

  if (!task) return null;

  const isSubTask = !!task.parentTaskId;

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
              {isSubTask ? task.sub_task_name : task.task_name}
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
                <Typography fontWeight={600}>
                  {p.progress_quantity}%
                </Typography>
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

      <ProgressFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        projectId={task.project_id}
        taskId={task.id}
      />
    </>
  );
}
