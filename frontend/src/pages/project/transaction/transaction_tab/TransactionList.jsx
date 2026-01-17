import { Box, Typography, Chip, Divider } from "@mui/material";

export default function TransactionList() {
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 2fr",
          background: "#F6F7FB",
          p: 1.5,
          fontWeight: 600
        }}
      >
        <Typography>Party</Typography>
        <Typography>Details</Typography>
        <Typography align="right">Status</Typography>
      </Box>

      {/* Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr 2fr",
          p: 2,
          alignItems: "center"
        }}
      >
        {/* Party */}
        <Box>
          <Chip
            label="17 Jan 26"
            size="small"
            color="success"
            sx={{ mb: 1 }}
          />

          <Typography fontWeight={600}>
            INTOUCH CONSTRUCTION & INFRAST...
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Payment In
          </Typography>
        </Box>

        {/* Details */}
        <Box>
          <Chip
            label="FOOD EXPENSES"
            size="small"
            variant="outlined"
          />
        </Box>

        {/* Status */}
        <Box textAlign="right">
          <Typography fontWeight={600}>₹ 2,000</Typography>
          <Chip label="Cash" size="small" />
        </Box>
      </Box>

      <Divider />
    </Box>
  );
}
