import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Switch, FormControlLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Chip } from "@mui/material";



import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgress,
  fetchTaskProgress,
  deleteProgress,
} from "../../../../features/projects/progress/progressSlice";

import {
  fetchProgressMessages,
  sendProgressMessage,
} from "../../../../features/projects/progress/progressMessageSlice";

import {
  fetchProgressTrackingFiles,
  uploadProgressFiles,
  deleteProgressFile,
} from "../../../../features/projects/progress/progressTrackingFilesSlice";

import { fetchProgressTimeline }
  from "../../../../features/projects/progress/progressTimelineSlice";

import {
  fetchSubTaskProgressTimeline,
} from "../../../../features/projects/progress/subTaskProgressTimelineSlice";



import ProgressFormModal from "./ProgressFormModal";
import ImagePreview from "./ImagePreview";

const EMPTY_ARRAY = [];

export default function ProgressDrawer({
  open,
  onClose,
  task,
  isSubtask,
  parentTaskId,
}) {
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const scrollRef = useRef(null);

  const [isCompleted, setIsCompleted] = useState(task?.is_completed ?? false);

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [preview, setPreview] = useState({ open: false, src: "" });

  const taskId = task?.id;

  const timeline = useSelector((state) => {
    if (!taskId) return EMPTY_ARRAY;

    if (isSubtask) {
      return state.subTaskProgressTimeline.byId[taskId] ?? EMPTY_ARRAY;
    }

    return state.progressTimeline.byId[taskId] ?? EMPTY_ARRAY;
  });





  const loading = useSelector((state) => state.progress.loading);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [timeline.length]);


  // Sync local isCompleted state with task prop changes
  useEffect(() => {
    setIsCompleted(task?.is_completed ?? false);
  }, [task]);
  const handleToggleComplete = async () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);

    await dispatch(
      updateTaskStatus({
        taskId: task.id,
        isCompleted: newStatus,
        isSubtask,
      })
    );

    // Refresh parent task if subtask
    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }
  };


  /* ================= FETCH ================= */

  useEffect(() => {
    if (!open || !task?.id) return;

    if (isSubtask) {
      dispatch(fetchSubTaskProgressTimeline({ subTaskId: task.id }));
    } else {
      dispatch(fetchProgressTimeline({ taskId: task.id }));
    }

    // 🔄 Update parent task progress if sub-task changed
    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }
  }, [
    open,
    task?.id,
    isSubtask,
    parentTaskId,
    dispatch,
  ]);


  /* ================= ACTIONS ================= */
  const handleEditProgress = (progress) => {
    setEditData(progress);
    setOpenModal(true);
  }

  const handleDeleteProgress = async (progressId) => {
    if (!window.confirm("Delete this progress update?")) return;

    await dispatch(
      deleteProgress({ id: progressId, taskId: task.id, isSubtask })
    );

    dispatch(fetchProgress({ taskId: task.id, isSubtask }));

    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !selectedImages.length) return;

    const res = await dispatch(
      sendProgressMessage({
        taskId: task.id,
        projectId: task.project_id,
        message,
        isSubtask,
      })
    ).unwrap();

    console.log("Message sent, response:", res);

    if (selectedImages.length) {
          console.log("IF", res);

      await dispatch(
        uploadProgressFiles({
          trackingId: res.message.id,
          files: selectedImages,
          isSubtask,
        })
      );
    }

     // ✅ REFRESH TIMELINE HERE
    if (isSubtask) {
      dispatch(fetchSubTaskProgressTimeline({ subTaskId: task.id }));
    } else {
      dispatch(fetchProgressTimeline({ taskId: task.id }));
    }

    // Optional: refresh parent task progress
    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }

    setMessage("");
    setSelectedImages([]);
  };

  const handleDeleteMessageImage = (fileId, messageId) => {
    if (!window.confirm("Delete this image?")) return;

    dispatch(
      deleteProgressFile({
        id: fileId,
        trackingId: messageId,
        isSubtask,
      })
    );
  };

  /* ================= AUTO SCROLL ================= */

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages.length]);

  /* ================= RENDER ================= */

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 520 } }}>
        <Box p={3} height="100%" display="flex" flexDirection="column">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" noWrap>
              {isSubtask ? task?.sub_task_name : task?.task_name}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                clickable
                onClick={handleToggleComplete}
                icon={
                  isCompleted
                    ? <CheckCircleIcon />
                    : <RadioButtonUncheckedIcon />
                }
                label={isCompleted ? "Completed" : "In Progress"}
                color={isCompleted ? "success" : "default"}
                variant={isCompleted ? "filled" : "outlined"}
                size="small"
              />

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>



          <Divider sx={{ my: 2 }} />

          {/* BODY */}
          <Box flex={1} overflow="auto">
            {loading && <CircularProgress />}

            {timeline.map((item) => {
              if (!item?.data) return null;

              /* ================= PROGRESS ================= */
              if (item.type === "progress") {
                const p = item.data;

                return (
                  <Box
                    key={`p-${p.id}`}
                    sx={{
                      p: 2,
                      mb: 2,
                      bgcolor: "#f5f5f5",
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    {/* ACTIONS */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="Edit progress">
                        <IconButton
                          size="small"
                          onClick={() => handleEditProgress(p)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete progress">
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
                    <Typography>{p.remarks}</Typography>

                    {p.files
                      ?.filter(file => file.file_type.startsWith("image/"))
                      ?.length > 0 && (
                        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                          {p.files
                            .filter(file => file.file_type.startsWith("image/"))
                            .map((file) => {
                              const imgUrl = `${import.meta.env.VITE_API_URL}/${file.file_path}`;

                              return (
                                <Box
                                  key={file.id}
                                  component="img"
                                  src={imgUrl}
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    objectFit: "cover",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setPreview({ open: true, src: imgUrl })}
                                />
                              );
                            })}
                        </Box>
                      )}

                  </Box>
                );
              }

              /* ================= MESSAGE ================= */
              if (item.type === "message") {
                const m = item.data;

                return (
                  <Box
                    key={`m-${m.id}`}
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: "#eef3ff",
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    {/* DELETE MESSAGE */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="Edit progress">
                        <IconButton
                          size="small"
                          onClick={() => handleEditMessage(p)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete progress">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteMessageImage(p.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography variant="body2">
                      {m.message}
                    </Typography>
                  </Box>
                );
              }

              return null;
            })}
            <div ref={scrollRef} />
          </Box>


          {/* FOOTER */}
          <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2, display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>

            <Box sx={{ flex: 1, display: "flex", border: "1px solid #d0d0d0", borderRadius: 2 }}>
              <input
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{ flex: 1, border: "none", padding: 10 }}
              />
              <IconButton onClick={() => imageInputRef.current.click()}>
                <ImageIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              disabled={!message.trim() && !selectedImages.length}
              onClick={handleSend}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>

          <input
            ref={imageInputRef}
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => setSelectedImages([...e.target.files])}
          />
        </Box>
      </Drawer>

      <ProgressFormModal
        open={openModal}
        onClose={() => { setOpenModal(false); setEditData(null); }}
        projectId={task?.project_id}
        taskId={task?.id}
        isSubtask={isSubtask}
        parentTaskId={parentTaskId}
        editData={editData}
      />

      <ImagePreview
        open={preview.open}
        src={preview.src}
        onClose={() => setPreview({ open: false, src: "" })}
      />
    </>
  );
}
