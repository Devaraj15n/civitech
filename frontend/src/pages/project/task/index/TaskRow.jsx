import {
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Box
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function TaskRow({ task, index, onOpenProgress }) {
  return (
    <>
      {/* Parent Task */}
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

        <TableCell>
          <Chip label={`${task.progress} %`} size="small" color="info" />
        </TableCell>

        <TableCell>-</TableCell>
        <TableCell>-</TableCell>

        <TableCell>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Sub Tasks */}
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
            <Chip
              label={`${sub.progress} / 100 %`}
              size="small"
              variant="outlined"
            />

            <IconButton
              size="small"
              color="primary"
              onClick={() => onOpenProgress(sub)}
            >
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
          </TableCell>

          <TableCell>-</TableCell>
          <TableCell>-</TableCell>

          <TableCell>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
