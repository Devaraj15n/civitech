import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../../features/projects/tasks/taskSlice";

import TaskRow from "./TaskRow";
import ProgressDrawer from "../progress/ProgressDrawer";
import TaskDrawer from "../drawer/TaskDrawer";
import SubTaskDrawer from "../drawer/SubTaskDrawer";

export default function TaskTable({ projectId }) {
  const dispatch = useDispatch();
  const { list: tasks = [], loading } = useSelector((s) => s.projectTask);

  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  const [openSubTaskDrawer, setOpenSubTaskDrawer] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [parentTask, setParentTask] = useState(null);

  const [openProgress, setOpenProgress] = useState(false);

  useEffect(() => {
    if (projectId) dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  /* ================= HANDLERS ================= */

  const handleAddTask = () => {
    setSelectedTask(null);
    setOpenTaskDrawer(true);
  };

  const handleAddSubTask = (task) => {
    setParentTask(task);
    setOpenSubTaskDrawer(true);
  };

  const handleOpenProgress = (data) => {
    setSelectedTask(data);
    setOpenProgress(true);
  };

  if (loading) return <CircularProgress />;

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
              {/* <TableCell>Progress</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                index={index + 1}
                onAddSubTaskClick={handleAddSubTask}
                onOpenProgress={handleOpenProgress}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* TASK DRAWER */}
      <TaskDrawer
        open={openTaskDrawer}
        onClose={() => setOpenTaskDrawer(false)}
        projectId={projectId}
        editData={selectedTask}
      />

      {/* SUB TASK DRAWER */}
      <SubTaskDrawer
        open={openSubTaskDrawer}
        onClose={() => setOpenSubTaskDrawer(false)}
        parentTask={parentTask}
      />

      {/* PROGRESS */}
      <ProgressDrawer
        open={openProgress}
        onClose={() => setOpenProgress(false)}
        task={selectedTask}
      />
    </>
  );
}
