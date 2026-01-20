import {
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  IconButton
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";

export default function ProgressTasks({
  open,
  onClose,
  task
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 480 } }}
    >
      <Box p={3} height="100%" display="flex" flexDirection="column">

        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {task?.name || "Progress"}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {task?.progress || 0} / 100 % (Not Started)
        </Typography>

        {/* Empty State */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          color="text.secondary"
        >
          <TrendingUpIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography>No Progress Update Added</Typography>
        </Box>

        {/* Footer */}
        <Box display="flex" gap={1}>
          <Button variant="contained">+ Progress</Button>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter Message"
          />
        </Box>

      </Box>
    </Drawer>
  );
}
