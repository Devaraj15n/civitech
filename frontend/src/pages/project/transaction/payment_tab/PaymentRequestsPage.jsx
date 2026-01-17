import { Box } from "@mui/material";
import PaymentRequestSummary from "./PaymentRequestSummary";
import PaymentRequestList from "./PaymentRequestList";

export default function PaymentRequestsPage() {
  return (
    <Box>
      <PaymentRequestSummary />
      <PaymentRequestList />
    </Box>
  );
}
