import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Box,
  Menu,
  MenuItem,
  Collapse,
  Tooltip,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import SubTaskTable from "../subtask/SubTaskTable";

export default function TaskRow({
  task,
  index,
  onOpenProgress,
  onAddSubTaskClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const hasSubTasks = task.subtask_count > 0;

  // Open progress for main task
  const handleProgressClick = (taskData) => {
    onOpenProgress(taskData, taskData.project_id); // pass project_id for main task
  };

  return (
    <>
      {/* ================= TASK ROW ================= */}
      <TableRow hover>
        <TableCell width={60}>{index}</TableCell>

        <TableCell>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>

            <strong>{task.task_name}</strong>
          </Box>
        </TableCell>

        <TableCell>{task.duration_days}</TableCell>
        <TableCell>{task.start_date}</TableCell>
        <TableCell>{task.end_date}</TableCell>
        <TableCell>{task.progress_percentage}%</TableCell>

        {/* 🔒 PROGRESS */}
        <TableCell>
          {hasSubTasks ? (
            <Tooltip title="Progress is tracked via subtasks">
              <Chip size="small" label={task.task_status} color="default" />
            </Tooltip>
          ) : (
            <Chip
              size="small"
              label={task.task_status}
              color="info"
              clickable
              onClick={() => handleProgressClick(task)}
            />
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onAddSubTaskClick(task);
              }}
            >
              + Add Subtask
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>

      {/* ================= SUB TASKS ================= */}
      <TableRow>
        <TableCell colSpan={7} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                pl: 6,
                py: 1,
                borderLeft: "3px solid #e0e0e0",
                bgcolor: "#fafafa",
              }}
            >
              <SubTaskTable
                taskId={task.id}
                parentProjectId={task.project_id} // pass parent project_id
                onOpenProgress={onOpenProgress}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
