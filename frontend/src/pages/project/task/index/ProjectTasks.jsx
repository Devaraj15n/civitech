import { useState } from "react";
import { Box } from "@mui/material";
import TaskToolbar from "./TaskToolbar";
import TaskTable from "./TaskTable";
import TaskDrawer from "../drawer/TaskDrawer";

export default function ProjectTasks() {
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);

  const handleOpenTaskDrawer = () => {
    setOpenTaskDrawer(true);
  };

  const handleCloseTaskDrawer = () => {
    setOpenTaskDrawer(false);
  };

  return (
    <Box>
      {/* ✅ PASS PROP HERE */}
      <TaskToolbar onAddTask={handleOpenTaskDrawer} />

      <TaskTable />

      <TaskDrawer
        open={openTaskDrawer}
        onClose={handleCloseTaskDrawer}
      />
    </Box>
  );
}
