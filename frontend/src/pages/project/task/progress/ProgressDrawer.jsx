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
import {
  fetchProgress,
  saveProgress,
} from "../../../../features/progress/progressSlice";

export default function ProgressDrawer({ open, onClose, task }) {
  const dispatch = useDispatch();
  const { list: progressList = [], loading } = useSelector(
    (s) => s.progress || {}
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (task) dispatch(fetchProgress(task.id));
  }, [dispatch, task]);

  if (!task) return null;

  const isSubTask = !!task.parentTaskId;

  const handleSaveProgress = async (data) => {
    try {
      await dispatch(
        saveProgress({
          project_id: task.project_id,
          task_id: task.id,
          progress_date: data.progress_date,
          progress_quantity: parseFloat(data.progress_quantity || 0),
          progress_percentage: parseFloat(data.progress_percentage || 0),
          remarks: data.remarks,
          location: data.location,
          status: 1,
          created_by: 1, // replace with user id
        })
      ).unwrap();

      setOpenModal(false);
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: 520 } }}
      >
        <Box p={3} height="100%" display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {isSubTask ? task.sub_task_name : task.task_name}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box flex={1} overflow="auto">
            {loading && <CircularProgress />}

            {progressList.length === 0 && !loading && (
              <Typography color="text.secondary" align="center" mt={4}>
                No Progress Update Added
              </Typography>
            )}

            {progressList.map((p) => (
              <Box
                key={p.id}
                sx={{ p: 2, mb: 1, borderRadius: 2, bgcolor: "#f5f5f5" }}
              >
                <Typography fontWeight={600}>
                  {p.progress_quantity} {p.location} — {p.progress_percentage}%
                </Typography>
                <Typography variant="body2">{p.remarks}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {p.progress_date}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box display="flex" gap={1}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>
          </Box>
        </Box>
      </Drawer>

      <ProgressFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveProgress}
      />
    </>
  );
}
