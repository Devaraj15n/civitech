import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

import TaskRow from "./TaskRow";
import ProgressDrawer from "./progress/ProgressDrawer";

/* Dummy Data */
const tasks = [
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
        progress: 0
      }
    ]
  }
];

export default function TaskTable() {
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenProgress = (task) => {
    setSelectedTask(task);
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
    </>
  );
}
