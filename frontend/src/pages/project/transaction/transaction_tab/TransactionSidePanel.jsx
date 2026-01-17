import { Drawer, Box, Button, Typography } from "@mui/material";

export default function TransactionSidePanel({ open, onClose, onAction }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 320, p: 2 }}>
        <Typography variant="subtitle2" mb={2}>
          Transaction Actions
        </Typography>

        <Button
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => onAction("PAYMENT_IN")}
        >
          + Payment In
        </Button>

        <Button
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => onAction("PAYMENT_OUT")}
        >
          + Payment Out
        </Button>

        <Button
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => onAction("DEBIT_NOTE")}
        >
          + Debit Note
        </Button>

        <Button
          fullWidth
          onClick={() => onAction("CREDIT_NOTE")}
        >
          + Credit Note
        </Button>
      </Box>
    </Drawer>
  );
}
