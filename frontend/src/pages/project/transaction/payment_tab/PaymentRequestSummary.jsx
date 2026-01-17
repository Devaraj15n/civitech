import { Box, Typography, Divider } from "@mui/material";

export default function PaymentRequestSummary() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        p: 2,
        mb: 2,
        border: "1px solid #E0E0E0",
        borderRadius: 2,
        background: "#FAFAFA"
      }}
    >
      {/* Project Balance */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Project Balance
        </Typography>
        <Typography fontWeight={600}>₹ 2,000</Typography>

        <Typography variant="caption">
          In: ₹ 2,000 | Out: ₹ 0
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      {/* Margin */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Margin
        </Typography>
        <Typography fontWeight={600}>₹ 0</Typography>

        <Typography variant="caption">
          Sales: ₹ 0 | Expense: ₹ 0
        </Typography>
      </Box>
    </Box>
  );
}
