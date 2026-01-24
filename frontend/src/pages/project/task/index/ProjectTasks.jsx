import { useState } from "react";
import { Box } from "@mui/material";
import TaskToolbar from "./TaskToolbar";
import TaskTable from "./TaskTable";
import TaskDrawer from "../drawer/TaskDrawer";
import { useParams } from "react-router-dom";


export default function ProjectTasks() {
  const { id } = useParams(); // <-- this is your projectId from URL
  const projectId = Number(id); // convert to number if needed
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);

  const handleOpenTaskDrawer = () => {
    setOpenTaskDrawer(true);
  };

  const handleCloseTaskDrawer = () => {
    setOpenTaskDrawer(false);
  };

        console.log("projectId");
        console.log(projectId);



  return (
    <Box>
      {/* ✅ PASS PROP HERE */}
      <TaskToolbar onAddTask={handleOpenTaskDrawer} />

      

      <TaskTable projectId={projectId}/>

      <TaskDrawer
        open={openTaskDrawer}
        onClose={handleCloseTaskDrawer}
        projectId={projectId}  // ✅ FIX
      />
    </Box>
  );
}
