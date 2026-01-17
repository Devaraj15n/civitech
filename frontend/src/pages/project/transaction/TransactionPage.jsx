import { Box,Button } from "@mui/material";
import { useState } from "react";
import TransactionSidePanel from "./transaction_tab/TransactionSidePanel";
import PaymentModal from "./payment_tab/PaymentModal";
import TransactionList from "./transaction_tab/TransactionList";
import TransactionSummary from "./transaction_tab/TransactionSummary";

export default function TransactionsPage() {
  const [modalType, setModalType] = useState(null);
  const [openSidePanel, setOpenSidePanel] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* LEFT CONTENT */}
      <Box sx={{ flex: 1 }}>
        <Box>
          <Button onClick={() => setOpenSidePanel(true)} variant="contained">
            + Transactions
          </Button>
        </Box>
        <TransactionSummary />
        <TransactionList />
      </Box>

      {/* BUTTON to open side panel */}

      {/* SIDE PANEL (DRAWER) */}
      <TransactionSidePanel
        open={openSidePanel}
        onClose={() => setOpenSidePanel(false)}
        onAction={(type) => {
          setModalType(type);
          setOpenSidePanel(false);
        }}
      />

      {/* PAYMENT MODAL */}
      <PaymentModal
        open={Boolean(modalType)}
        type={modalType}
        onClose={() => setModalType(null)}
      />
    </Box>
  );
}
