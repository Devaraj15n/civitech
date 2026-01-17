import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material";

export default function PaymentModal({ open, type, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {type === "payment-in" ? "Payment In" : "Payment Out"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Party" fullWidth />
          <TextField label="Amount" fullWidth />
          <TextField label="Payment Mode" fullWidth />
          <TextField label="Remarks" fullWidth multiline rows={3} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
