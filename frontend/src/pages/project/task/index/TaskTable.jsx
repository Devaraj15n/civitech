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

export default function TaskTable({ projectId }) {
  const dispatch = useDispatch();
  const { list: tasks = [], loading } = useSelector((s) => s.projectTask);

  const [openProgress, setOpenProgress] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [openSubTaskDrawer, setOpenSubTaskDrawer] = useState(false);
  const [parentTask, setParentTask] = useState(null);

  useEffect(() => {
    if (projectId) dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  const handleAddSubTaskClick = (task) => {
    setParentTask(task);
    setOpenSubTaskDrawer(true);
  };

  const handleOpenProgress = (taskOrSubTask) => {
    setSelectedTask(taskOrSubTask);
    setOpenProgress(true);
  };

  const handleCloseProgress = () => {
    setOpenProgress(false);
    setSelectedTask(null);
  };

  if (loading) return <CircularProgress />;

  console.log("projectId+++++++++");
  console.log(projectId);
  

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

      <ProgressDrawer
        open={openProgress}
        onClose={handleCloseProgress}
        task={selectedTask}
      />

      <TaskDrawer
        open={openSubTaskDrawer}
        onClose={() => setOpenSubTaskDrawer(false)}
        parentTask={parentTask}
        projectId={projectId} // <-- pass it here
        editData={selectedTask}
      />
    </>
  );
}
