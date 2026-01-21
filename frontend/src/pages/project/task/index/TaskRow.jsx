import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TaskRow({
  task,
  index,
  onOpenProgress,
  onAddSubTaskClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      {/* ================= PARENT TASK ================= */}
      <TableRow>
        <TableCell>{index}</TableCell>

        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            <KeyboardArrowDownIcon fontSize="small" />
            <b>{task.name}</b>
          </Box>
        </TableCell>

        <TableCell>{task.duration}</TableCell>
        <TableCell>-</TableCell>
        <TableCell>-</TableCell>

        {/* PROGRESS + CHAT */}
        {/* PROGRESS + CHAT */}
        <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip label={`${task.progress} %`} size="small" color="info" />

          {/* 💬 Show chat ONLY if no subtasks */}
          {task.children.length === 0 && (
            <IconButton
              size="small"
              color="primary"
              onClick={() => onOpenProgress(task)}
            >
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </TableCell>

        <TableCell>-</TableCell>
        <TableCell>-</TableCell>

        {/* EDIT MENU */}
        <TableCell>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                onAddSubTaskClick(task);
              }}
            >
              + Add Subtask
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>

      {/* ================= SUB TASKS ================= */}
      {task.children.map((sub, i) => (
        <TableRow key={sub.id}>
          <TableCell>
            {index}.{i + 1}
          </TableCell>

          <TableCell sx={{ pl: 5 }}>↳ {sub.name}</TableCell>

          <TableCell>{sub.duration}</TableCell>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>

          <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip label={`${sub.progress} %`} size="small" variant="outlined" />

            {/* SUB TASK CHAT */}
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                onOpenProgress({
                  ...sub,
                  parentTaskId: task.id,
                  parentTaskName: task.name,
                })
              }
            >
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </TableCell>

          <TableCell>-</TableCell>
          <TableCell>-</TableCell>

          <TableCell>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
