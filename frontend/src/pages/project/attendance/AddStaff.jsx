import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Divider,
  TextField,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../../api/axios"; // your axios instance

export default function AddStaff({ open, onClose, projectId, onAdded }) {

  console.log("projectId");
  console.log(projectId);

  const [labour, setLabour] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({}); // { [party_id]: true }

  // Fetch labour on open
  useEffect(() => {
    if (open) fetchLabour();
  }, [open]);


  const fetchLabour = async () => {
    try {
      // const res = await api.get("/parties/labour");
      const res = await api.get(`project-parties/available-labour/${projectId}`);
      setLabour(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching labour:", err);
    }
  };

  // Handle checkbox toggle
  const handleSelect = (partyId) => {
    setSelected((prev) => ({
      ...prev,
      [partyId]: !prev[partyId],
    }));
  };

  // Add selected staff to project
  const handleAdd = async () => {
    const selectedIds = Object.keys(selected).filter((id) => selected[id]);
    try {
      for (let id of selectedIds) {
        await api.post("/project-parties", {
          project_id: projectId,
          party_id: parseInt(id),
          role: "Contractor", // you can make this dynamic
        });
      }
      onAdded && onAdded(); // notify parent to refresh members
      onClose();
    } catch (err) {
      console.error("Error adding staff to project:", err);
    }
  };

  // Filter labour based on search
  const filteredLabour = labour.filter((l) =>
    l.party_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Grid width="550px" mt={1} container justifyContent="space-between" display="flex">
        <Grid display="flex" alignItems="center" gap={1}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography mt={1} fontSize="16px">
            Select Site Staff Payroll
          </Typography>
        </Grid>
        <Grid>
          <Button
            sx={{ color: "white", background: "blue", mt: 1, height: 30 }}
            onClick={handleAdd}
            disabled={Object.values(selected).every((v) => !v)}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 2, mt: 1 }} />

      <Grid justifyContent="center" ml={3} mt={5}>
        <TextField
          placeholder="Search Site Staff"
          sx={{ width: 500 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid container mt={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      filteredLabour.length > 0 &&
                      filteredLabour.every((l) => selected[l.id])
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newSelected = {};
                      filteredLabour.forEach((l) => {
                        newSelected[l.id] = checked;
                      });
                      setSelected(newSelected);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "13px" }}>Name</TableCell>
                <TableCell sx={{ fontSize: "13px" }} align="right">
                  Payroll type
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredLabour.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No available Labour for this project. Please add Labour to the system.
                  </TableCell>
                </TableRow>
              )}
              {filteredLabour.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={!!selected[row.id]}
                      onChange={() => handleSelect(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.party_name}</TableCell>
                  <TableCell align="right">{row.salary_type || "Daily"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Drawer>
  );
}