import { Box, Card, Typography, Divider } from "@mui/material";

function SummaryCard({ title, amount, line1, line2 }) {
  return (
    <Card sx={{ p: 2, flex: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h6" fontWeight={600} mt={0.5}>
        ₹ {amount}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography variant="body2">
        {line1} | {line2}
      </Typography>
    </Card>
  );
}

export default function TransactionSummary() {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <SummaryCard
        title="Project Balance"
        amount="2,000"
        line1="In: ₹ 2,000"
        line2="Out: ₹ 0"
      />

      <SummaryCard
        title="Margin"
        amount="0"
        line1="Sales: ₹ 0"
        line2="Expense: ₹ 0"
      />
    </Box>
  );
}
