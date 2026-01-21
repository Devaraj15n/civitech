import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import TaskRow from "./TaskRow";
import ProgressDrawer from "../progress/ProgressDrawer";
import TaskDrawer from "../drawer/TaskDrawer";

/* Dummy Data */
const initialTasks = [
  {
    id: 1,
    name: "TEST",
    duration: "20 days",
    progress: 0,
    children: [
      {
        id: 11,
        name: "Construction",
        duration: "20 days",
        progress: 0,
      },
    ],
  },
];

export default function TaskTable() {
  const [tasks] = useState(initialTasks);
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [openSubTaskDrawer, setOpenSubTaskDrawer] = useState(false);
  const [parentTask, setParentTask] = useState(null);

  const handleAddSubTaskClick = (task) => {
    setParentTask(task);
    setOpenSubTaskDrawer(true);
  };

  /* 🔑 OPEN PROGRESS DRAWER (TASK / SUBTASK) */
  const handleOpenProgress = (taskOrSubTask) => {
    setSelectedTask(taskOrSubTask);
    setOpenProgress(true);
  };

  const handleCloseProgress = () => {
    setOpenProgress(false);
    setSelectedTask(null);
  };

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Progress Status</TableCell>
              <TableCell>Planned Start</TableCell>
              <TableCell>Planned End</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index + 1}
                onOpenProgress={handleOpenProgress}
                onAddSubTaskClick={handleAddSubTaskClick}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* RIGHT SIDE PROGRESS DRAWER */}
      <ProgressDrawer
        open={openProgress}
        onClose={handleCloseProgress}
        task={selectedTask}
      />
      <TaskDrawer
        open={openSubTaskDrawer}
        onClose={() => setOpenSubTaskDrawer(false)}
        parentTask={parentTask}
      />
    </>
  );
}
