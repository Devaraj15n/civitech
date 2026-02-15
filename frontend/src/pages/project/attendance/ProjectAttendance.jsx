import React from 'react'
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup,Grid,TextField,Autocomplete, Button, Divider, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import AddStaff from './AddStaff';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



function ProjectAttendance() {
      const [formats, setFormats] = React.useState([]);
        const [value, setValue] = React.useState(dayjs());
        const [openDrawer, setOpenDrawer] = useState(false);
const options = ["Active", "Inactive"];
const absentoptions = ["Absent", "week off","paid leave"];
const rows = [
  { name: "John Doe", status: "Present" },
  { name: "Jane Smith", status: "Absent" },
  { name: "Michael Johnson", status: "Present" },
];
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };


  
  const handleOpen = () => setOpenDrawer(true);
  const handleClose = () => setOpenDrawer(false);
  return (
    <div>
    <>
    <Grid container size={12} display={'flex'} justifyContent={'space-between'}>
        <Grid display={'flex'} gap={2}>
            <Grid>
   <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
       sx={{
        borderRadius: "5px",
        height:40
      }}
    >
      <ToggleButton value="bold" >All</ToggleButton>
      <ToggleButton value="italic">Site Staff</ToggleButton>
      <ToggleButton value="underline">Labour Contractor</ToggleButton>
    </ToggleButtonGroup>
</Grid>
<Grid>
    <Autocomplete
      options={options}
      size='small'
      renderInput={(params) => (
        <TextField {...params} label="Select" variant="outlined" />
      )}
      sx={{ width: 130 }}
    />
        </Grid>
     </Grid>

<Grid  display={'flex'}>
       <Button  onClick={handleOpen} sx={{color:'white',background:'violet',height:40}}>
        + Add Site Staff
       </Button>
</Grid>
    </Grid>

  <Divider sx={{ borderBottomWidth: 2,mt:3 }} />


<Grid container size={12} display={'flex'} justifyContent={'space-between'} mt={2}>
    <Grid display={'flex'} gap={2}>
<Grid>
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
</Grid>
<Grid>
<TextField
  label="Search"
  size="small"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>
</Grid>

    </Grid>

   <Grid container direction="column" spacing={2}>
  <Grid item>
    <Typography>0 Present</Typography>
  </Grid>

  <Grid display={'flex'} gap={2}>
    <Typography sx={{fontSize:'12px'}}>0 Absent</Typography>
    <Typography sx={{fontSize:'12px'}}>0 Paid leave</Typography>
    <Typography sx={{fontSize:'12px'}}>0 Week Off</Typography>
  </Grid>
</Grid>
</Grid>

<Grid container size={12}  mt={2}>
    <TableContainer component={Paper} sx={{ maxWidth: 1100,ml:1 }}>
      <Table>
        <TableHead>
         <TableRow sx={{ background: "#e8e9ed" }}>
  <TableCell>
    <strong>Name</strong>
  </TableCell>
  <TableCell align="right">
    <strong>Attendance Status</strong>
  </TableCell>
</TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell sx={{display:'flex',gap:1}} align='right'>
<Grid>
  <Autocomplete
  disableClearable
      options={absentoptions}
      size='small'
      renderInput={(params) => (
        <TextField {...params} value={'absent'} variant="outlined" />
      )}
      sx={{ width: 130 }}
    />
  </Grid>
  <Grid>
  <Button>
Present
</Button>
</Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <AddStaff  open={openDrawer} onClose={handleClose}/>
    </>
    </div>
  )
}

export default ProjectAttendance
