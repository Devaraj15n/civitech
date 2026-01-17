import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TransactionDrawer({ open, onClose, type }) {
  const config = drawerConfig[type] || {};

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 3 }}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{config.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* FORM */}
        <Stack spacing={2}>
          <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} />

          <TextField label="Party" select>
            <MenuItem value="vendor1">Vendor 1</MenuItem>
            <MenuItem value="vendor2">Vendor 2</MenuItem>
          </TextField>

          <TextField label="Amount" type="number" />

          {config.showCategory && (
            <TextField label="Category" select>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="material">Material</MenuItem>
            </TextField>
          )}

          <TextField label="Remarks" multiline rows={3} />

          {/* ACTION */}
          <Button
            variant="contained"
            color={config.color || "primary"}
            size="large"
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
