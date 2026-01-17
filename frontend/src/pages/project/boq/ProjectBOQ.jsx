import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

/* ---- Dummy BOQ Data (UI only) ---- */
const boqSummary = {
  total_items: 12,
  total_quantity: 1540,
  estimated_cost: "₹ 8,75,00,000",
  approved_cost: "₹ 8,20,00,000",
};

const boqRows = [
  {
    id: 1,
    code: "BOQ-001",
    description: "Earth Work Excavation",
    unit: "Cum",
    quantity: 500,
    rate: 850,
    amount: 425000,
    status: "Approved",
  },
  {
    id: 2,
    code: "BOQ-002",
    description: "PCC Concrete",
    unit: "Cum",
    quantity: 320,
    rate: 4200,
    amount: 1344000,
    status: "Pending",
  },
];

const statusColor = {
  Approved: "success",
  Pending: "warning",
  Rejected: "error",
};

const columns = [
  { field: "code", headerName: "BOQ Code", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "unit", headerName: "Unit", flex: 1 },
  { field: "quantity", headerName: "Qty", flex: 1 },
  { field: "rate", headerName: "Rate (₹)", flex: 1 },
  {
    field: "amount",
    headerName: "Amount (₹)",
    flex: 1,
    renderCell: (params) => {
      const qty = params.row?.quantity || 0;
      const rate = params.row?.rate || 0;
      return (qty * rate).toLocaleString("en-IN");
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={statusColor[params.value]}
      />
    ),
  },
];

export default function ProjectBOQ() {
  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Bill of Quantities (BOQ)
        </Typography>

        <Button variant="contained">+ Add BOQ Item</Button>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Total Items</Typography>
            <Typography variant="h6">{boqSummary.total_items}</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Total Quantity</Typography>
            <Typography variant="h6">{boqSummary.total_quantity}</Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Estimated Cost</Typography>
            <Typography variant="h6" color="primary">
              {boqSummary.estimated_cost}
            </Typography>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body2">Approved Cost</Typography>
            <Typography variant="h6" color="success.main">
              {boqSummary.approved_cost}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* BOQ Table */}
      <Card sx={{ height: 420 }}>
        <DataGrid
          rows={boqRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Card>
    </Box>
  );
}
