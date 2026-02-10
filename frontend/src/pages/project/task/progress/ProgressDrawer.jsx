import { useState, useEffect, useRef } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProgress,
  fetchTaskProgress,
  deleteProgress,
} from "../../../../features/projects/progress/progressSlice";

export default function ProgressDrawer({
  open,
  onClose,
  task,
  isSubtask,
  parentTaskId,
}) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const imageInputRef = useRef(null);

  const list = useSelector(
    (state) => state.progress.byTask[task?.id] || []
  );
  const loading = useSelector((state) => state.progress.loading);

  useEffect(() => {
    if (!open || !task?.id) return;

    dispatch(fetchProgress({ taskId: task.id, isSubtask }));

    if (isSubtask && parentTaskId) {
      dispatch(fetchTaskProgress({ taskId: parentTaskId }));
    }
  }, [open, task?.id, isSubtask, parentTaskId, dispatch]);

  // ✅ SEND HANDLER
  const handleSend = () => {
    if (!message.trim()) return;

    console.log("SEND MESSAGE:", message);
    console.log("IMAGES:", selectedImages);

    // 🔥 API / dispatch call goes here

    setMessage("");
    setSelectedImages([]);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 520 } }}
    >
      <Box p={3} height="100%" display="flex" flexDirection="column">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            {isSubtask ? task?.sub_task_name : task?.task_name}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* BODY */}
        <Box flex={1} overflow="auto">
          {loading && <CircularProgress />}

          {!loading && list.length === 0 && (
            <Typography align="center" mt={4} color="text.secondary">
              No Progress Update Added
            </Typography>
          )}

          {list.map((p) => (
            <Box
              key={p.id}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={600}>{p.progress_quantity}%</Typography>
              <Typography variant="body2">{p.remarks}</Typography>
              <Typography variant="caption">{p.progress_date}</Typography>
            </Box>
          ))}
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            borderTop: "1px solid #e0e0e0",
            pt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* 🔁 DEFAULT MODE */}
          {message.length === 0 ? (
            <>
              <Button variant="contained">+ Progress</Button>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #d0d0d0",
                  borderRadius: 2,
                  px: 1,
                  height: 44,
                }}
              >
                <input
                  placeholder="Enter Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                  }}
                />

                <IconButton onClick={() => imageInputRef.current.click()}>
                  <ImageIcon />
                </IconButton>

                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            /* ✨ TYPING MODE */
            <>
              <IconButton onClick={() => setMessage("")}>
                <ArrowBackIcon />
              </IconButton>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #d0d0d0",
                  borderRadius: 2,
                  px: 1,
                  height: 44,
                }}
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  autoFocus
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                  }}
                />
              </Box>

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSend}
              >
                Send
              </Button>
            </>
          )}
        </Box>

        {/* HIDDEN IMAGE INPUT */}
        <input
          type="file"
          ref={imageInputRef}
          hidden
          accept="image/*"
          multiple
          onChange={(e) => setSelectedImages(Array.from(e.target.files))}
        />
      </Box>
    </Drawer>
  );
}
