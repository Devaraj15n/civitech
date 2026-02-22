import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ToggleButtonGroup,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AddStaff from "./AddStaff";
import { fetchProjectMembers } from "../../../features/projects/project_party/projectPartySlice";
import { useParams } from "react-router-dom";


function ProjectAttendance() {
  const dispatch = useDispatch();
  const { id } = useParams(); // <-- this is your projectId from URL
  const projectId = Number(id); // convert to number if needed

  const [attendanceData, setAttendanceData] = useState({});


  const { list: members, loading, error } = useSelector(
    (state) => state.projectParties
  );

  const [formats, setFormats] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const absentOptions = ["Absent", "Week Off", "Paid Leave"];

  const handleFormat = (event, newFormats) => setFormats(newFormats);
  const handleOpen = () => setOpenDrawer(true);
  const handleClose = () => setOpenDrawer(false);

  // Fetch project members on load
  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectMembers(projectId));
    }
  }, [projectId, dispatch]);

  // Filter members based on search
  const filteredMembers = members.filter((m) =>
    m.party?.party_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid display="flex" gap={2}>
          <ToggleButtonGroup
            value={formats}
            onChange={handleFormat}
            sx={{ borderRadius: "5px", height: 40 }}
          ></ToggleButtonGroup>
        </Grid>

        <Grid display="flex">
          <Button
            onClick={handleOpen}
            sx={{ color: "white", background: "violet", height: 40 }}
          >
            + Add Site Staff
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 2, mt: 3 }} />

      <Grid container justifyContent="space-between" mt={2} gap={2}>
        {/* Left side: Date Picker + Search */}
        <Grid xs={12} sm={6} md={6} display="flex" gap={2} alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              slotProps={{
                textField: { size: "small", fullWidth: true },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Right side: Attendance summary */}
        <Grid xs={12} sm={6} md={6} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
          <Typography>
            Present: {members.filter((m) => m.attendance_status === "Present").length}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Absent: {members.filter((m) => m.attendance_status === "Absent").length}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Paid Leave: {members.filter((m) => m.attendance_status === "Paid Leave").length}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Week Off: {members.filter((m) => m.attendance_status === "Week Off").length}
          </Typography>
        </Grid>
      </Grid>
      {/* 
      <Grid container direction="column" mt={2}>

      </Grid> */}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#e8e9ed" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell align="right"><strong>Attendance Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={2}>Error: {error}</TableCell>
              </TableRow>
            )}
            {!loading && filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.party.party_name}</TableCell>
                <TableCell sx={{ display: "flex", gap: 1 }} align="right">
                  <Autocomplete
                    disableClearable
                    options={absentOptions}
                    size="small"
                    defaultValue={member.attendance_status || "Present"}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: 130 }}
                  />
                  <Button>Present</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddStaff
        open={openDrawer}
        onClose={handleClose}
        projectId={projectId}          // <-- Pass project ID here
        onAdded={() => dispatch(fetchProjectMembers(projectId))} // refresh members
      />
    </div>
  );
}

export default ProjectAttendance;