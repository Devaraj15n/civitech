import {
  Box,
  Typography,
  Chip,
  Divider
} from "@mui/material";

export default function PaymentRequestList() {
  return (
    <Box
      sx={{
        border: "1px solid #E0E0E0",
        borderRadius: 2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 1.5fr 1fr",
          p: 1.5,
          background: "#F5F5F5",
          fontWeight: 500,
          fontSize: "13px"
        }}
      >
        <Typography>Party</Typography>
        <Typography>Details</Typography>
        <Typography>Status</Typography>
        <Typography align="right">Amount</Typography>
      </Box>

      <Divider />

      {/* Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 1.5fr 1fr",
          p: 1.5,
          alignItems: "center"
        }}
      >
        {/* Party */}
        <Box>
          <Typography fontWeight={500}>17 Jan 26</Typography>
          <Typography variant="caption" color="text.secondary">
            Request (#PY-1)
          </Typography>
        </Box>

        {/* Details */}
        <Box>
          <Typography>Others</Typography>
          <Typography variant="caption" color="text.secondary">
            Against Petty Cash
          </Typography>
        </Box>

        {/* Status */}
        <Chip
          label="Pending"
          size="small"
          sx={{
            background: "#FFF3CD",
            color: "#856404",
            fontWeight: 500
          }}
        />

        {/* Amount */}
        <Typography align="right" fontWeight={600}>
          ₹ 200
        </Typography>
      </Box>
    </Box>
  );
}
