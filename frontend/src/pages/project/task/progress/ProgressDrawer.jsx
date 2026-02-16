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
  deleteProgressMessageThunk,
  deleteProgressFile,
} from "../../../../features/projects/progress/progressMessageSlice";

// import {
//   fetchProgressTrackingFiles,
//   uploadProgressFiles,
//   deleteProgressFile,
// } from "../../../../features/projects/progress/progressTrackingFilesSlice";

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
    if (!open || !taskId) return;
    if (isSubtask) dispatch(fetchSubTaskProgressTimeline({ subTaskId: taskId }));
    else dispatch(fetchProgressTimeline({ taskId }));
    if (isSubtask && parentTaskId) dispatch(fetchTaskProgress({ taskId: parentTaskId }));
  }, [open, taskId, isSubtask, parentTaskId, dispatch]);


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

    const files = selectedImages.map((file) => ({
      file_path: file.path,     // or temporary path if using FormData
      file_type: file.type,
    }));
    console.log(files);


    const res = await dispatch(
      sendProgressMessage({
        taskId,
        projectId: task.project_id,
        message,
        files,          // pass the files here
        isSubtask,
      })
    ).unwrap();

    setMessage("");
    setSelectedImages([]);

    if (isSubtask) dispatch(fetchSubTaskProgressTimeline({ subTaskId: taskId }));
    else dispatch(fetchProgressTimeline({ taskId }));
  };


  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    await dispatch(deleteProgressMessageThunk({ id: messageId, taskId, isSubtask }));
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("Delete this image?")) return;
    await dispatch(deleteProgressFile({ id: fileId, taskId, isSubtask }));
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

              const isProgress = item.type === "progress";
              const isMessage = item.type === "message";

              return (
                <Box
                  key={`${item.type}-${item.data.id}`}
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: isProgress ? "#f5f5f5" : "#eef3ff",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  {/* Actions */}
                  {isProgress && (
                    <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                      <Tooltip title="Edit progress">
                        <IconButton size="small" onClick={() => { setEditData(item.data); setOpenModal(true); }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete progress">
                        <IconButton size="small" color="error" onClick={() => handleDeleteProgress(item.data.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}

                  {isMessage && (
                    <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                      <Tooltip title="Delete message">
                        <IconButton size="small" color="error" onClick={() => handleDeleteMessage(item.data.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}

                  {/* Content */}
                  {isProgress && (
                    <>
                      <Typography fontWeight={600}>{item.data.progress_quantity}%</Typography>
                      <Typography>{item.data.remarks}</Typography>
                    </>
                  )}
                  {isMessage && item.data.message && (
                    <Typography variant="body2" sx={{ mb: item.data.files?.length ? 1 : 0 }}>
                      {item.data.message}
                    </Typography>
                  )}

                  {/* Images */}
                  {item.data.files?.filter(f => f.file_type.startsWith("image/"))?.length > 0 && (
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {item.data.files.filter(f => f.file_type.startsWith("image/")).map((file) => {
                        const url = `${import.meta.env.VITE_FILE_URL}/${file.file_path}`;
                        return (
                          <Box key={file.id} sx={{ position: "relative", width: 80, height: 80 }}>
                            <img
                              src={url}
                              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4, cursor: "pointer" }}
                              onClick={() => setPreview({ open: true, src: url })}
                            />
                            {isMessage && (
                              <IconButton
                                size="small"
                                sx={{ position: "absolute", top: -8, right: -8, backgroundColor: "white", border: "1px solid #ccc" }}
                                onClick={() => handleDeleteFile(file.id)}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              );
            })}
            <div ref={scrollRef} />
          </Box>


          {/* FOOTER */}
          <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2, display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              + Progress
            </Button>

            {/* PREVIEW SELECTED IMAGES */}
            {selectedImages.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 1,
                  flexWrap: "wrap",
                }}
              >
                {Array.from(selectedImages).map((file, index) => {
                  const url = URL.createObjectURL(file); // local preview

                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        overflow: "hidden",
                        border: "1px solid #d0d0d0",
                      }}
                    >
                      <img
                        src={url}
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "white",
                          border: "1px solid #ccc",
                          "&:hover": { backgroundColor: "#eee" },
                        }}
                        onClick={() =>
                          setSelectedImages(prev => prev.filter((_, i) => i !== index))
                        }
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            )}


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
