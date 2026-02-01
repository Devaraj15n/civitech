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
import ImagePreview from "./ImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgress } from "../../../../features/projects/progress/progressSlice";
import { fetchTaskProgress } from "../../../../features/projects/progress/progressSlice";
import { deleteProgress } from "../../../../features/projects/progress/progressSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

export default function ProgressDrawer({
  open,
  onClose,
  task,
  isSubtask,
  parentTaskId,
}) {

  // console.log("task+++++++++");
  // console.log(task);

  console.log("isSubtask=====");
  console.log(isSubtask);
  const [editData, setEditData] = useState(null);


  const dispatch = useDispatch();

  const list = useSelector(
    (state) => state.progress.byTask[task?.id] || []
  );
  const loading = useSelector((state) => state.progress.loading);

  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState({ open: false, src: "" });

  useEffect(() => {
    if (!open || !task?.id) return;

    dispatch(fetchProgress({ taskId: task.id, isSubtask }));

    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }
  }, [open, task?.id, isSubtask, parentTaskId, dispatch]);


  const handleDeleteProgress = async (progressId) => {
    if (!window.confirm("Delete this progress update?")) return;


    console.log("isSubtask from delte progress");
    console.log(isSubtask);
    
    try {
      await dispatch(
        deleteProgress({ id: progressId, taskId: task.id, isSubtask })
      ).unwrap();

      dispatch(fetchProgress({ taskId: task.id, isSubtask }));

      if (isSubtask && parentTaskId) {
        dispatch(fetchTaskProgress({ taskId: parentTaskId }));
      }
    } catch (err) {
      console.error("Delete failed", err);
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
          {/* Header */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              {isSubtask ? task?.sub_task_name : task?.task_name || "Task"}
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
              <Typography align="center" color="text.secondary" mt={4}>
                No Progress Update Added
              </Typography>
            )}

            {list.map((p) => (
              <Box
                key={p.id}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                  position: "relative",
                }}
              >
                {/* 🔧 Card Actions */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    display: "flex",
                    gap: 0.5,
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditData(p);
                        setOpenModal(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteProgress(p.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography fontWeight={600}>
                  {p.progress_quantity}%
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {p.remarks}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {p.progress_date}
                </Typography>


                {p.files?.length > 0 && (
                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    {p.files.map((file) => {
                      const imgUrl = `${import.meta.env.VITE_API_URL}/${file.file_path}`;

                      return (
                        <Box
                          key={file.id}
                          component="img"
                          src={imgUrl}
                          alt={file.file_name}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 1,
                            objectFit: "cover",
                            cursor: "pointer",
                            border: "1px solid #ddd",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: 2,
                            },
                          }}
                          onClick={() =>
                            setPreview({ open: true, src: imgUrl })
                          }
                        />
                      );
                    })}
                  </Box>
                )}
              </Box>
            )
            )
            }
          </Box>

          {/* Footer */}
          <Box>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Progress Modal */}
      <ProgressFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null); // ✅ reset after close
        }}
        projectId={task?.project_id || null}
        taskId={task?.id || null}
        isSubtask={isSubtask}
        parentTaskId={parentTaskId}
        editData={editData}   // ✅ PASS IT
      />


      {/* Image Preview */}
      <ImagePreview
        open={preview.open}
        src={preview.src}
        onClose={() => setPreview({ open: false, src: "" })}
      />
    </>
  );
}

