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

  // Drawers & selected task state
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  const [openSubTaskDrawer, setOpenSubTaskDrawer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [parentTask, setParentTask] = useState(null);
  const [openProgress, setOpenProgress] = useState(false);

  // Fetch tasks on mount or project change
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

  const handleEditTask = (task) => {
  setSelectedTask(task);     // 👈 pass task as editData
  setOpenTaskDrawer(true);   // 👈 open drawer
};

  const handleOpenProgress = (
    task,
    {
      isSubtask = false,
      parentTaskId = null,
      projectId = null,
    } = {}
  ) => {
    setSelectedTask({
      ...task,
      parentTaskId,
      project_id: projectId,
    });

    setOpenProgress(true);
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
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  index={index + 1}
                  onAddSubTaskClick={handleAddSubTask}
                  onOpenProgress={handleOpenProgress}
                  onEditTaskClick={handleEditTask}
                />
              ))
            )}
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

      {/* PROGRESS DRAWER */}
      <ProgressDrawer
        open={openProgress}
        onClose={() => setOpenProgress(false)}
        task={selectedTask}
        isSubtask={!!selectedTask?.parentTaskId}
        parentTaskId={selectedTask?.parentTaskId || null}
      />
    </>
  );
}
