import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const MasterList = ({
  title,
  columns,
  rows,
  onAdd,
  onEdit,
  loading
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filteredRows = rows.filter((row) => {
    const searchMatch = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      status === "" || row.status === Number(status);

    return searchMatch && statusMatch;
  });

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">{title}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          size="small"
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
        </TextField>
      </Box>

      {/* Grid */}
      <DataGrid
        rows={filteredRows}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => (
              <Button size="small" onClick={() => onEdit(params.row)}>
                Edit
              </Button>
            )
          }
        ]}
        autoHeight
        loading={loading}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default MasterList;
