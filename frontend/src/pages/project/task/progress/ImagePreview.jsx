import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ImagePreview({ open, onClose, src }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Box position="relative" bgcolor="black">
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <img
          src={src}
          alt="Preview"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "block",
            margin: "auto",
          }}
        />
      </Box>
    </Dialog>
  );
}

