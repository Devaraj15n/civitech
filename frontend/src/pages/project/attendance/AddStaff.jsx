import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Button,
  Divider,
  TextField
} from "@mui/material";
import { Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function AddStaff({ open, onClose }) {
    const rows = [
  { name: "John Doe", status: "Daily" },
  { name: "Jane Smith", status: "Daily" },
  { name: "Michael Johnson", status: "Daily" },
];
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      
      
            <Grid width={'550px'} mt={1} container justifyContent={'space-between'} size={12} display={'flex'}>
                <Grid display={'flex'}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography mt={1} fontSize={'16px'}>Select Site Staff Payroll</Typography>
          </Grid>
          <Grid>
             <Button   sx={{color:'white',background:'blue',mt:1,height:30}}>
        Add
       </Button>
          </Grid>
        </Grid>
  <Divider sx={{ borderBottomWidth: 2,mt:1 }} />

  <Grid  justifyContent={'center'} ml={3} mt={5}>
<TextField
  placeholder="Search Site Staff"
    sx={{ width: 500 }}  
  InputProps={{
    endAdornment: (
      <InputAdornment position="End">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>
</Grid>
<Grid display={'flex'} mt={1} justifyContent={'flex-end'}>
  <Button>
     <Typography sx={{fontSize:'12px'}} variant="h6">+ New Site Staff Payroll</Typography>
     </Button>
</Grid>

<Grid container mt={2}>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox />
          </TableCell>
          <TableCell sx={{fontSize:'13px'}}>Name</TableCell>
          <TableCell  sx={{fontSize:'13px'}} align="right">Payroll type</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Grid>

        {/* Your form goes here */}

    </Drawer>
  );
}
