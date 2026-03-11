import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions

} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AddStaff from "./AddStaff";
import { fetchProjectMembers } from "../../../features/projects/project_party/projectPartySlice";
import { useParams } from "react-router-dom";
import api from "../../../api/axios"; // your axios instance
import { toast } from "react-toastify";
import AttendancePopup from "./AttendancePopup";


function ProjectAttendance() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const projectId = Number(id);

  const { list: members, loading, error } = useSelector(
    (state) => state.projectParties
  );

  const [attendanceDate, setAttendanceDate] = useState(dayjs());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({}); // { [party_id]: status }
  const [attendanceRecords, setAttendanceRecords] = useState({});

  const [openAttendancePopup, setOpenAttendancePopup] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [attendanceAmount, setAttendanceAmount] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [pendingPartyId, setPendingPartyId] = useState(null);
  const Options = ["Present", "Absent", "Week Off", "Paid Leave"];

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectMembers(projectId));
    }
  }, [projectId, dispatch]);
  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance", {
        params: {
          project_id: projectId,
          from_date: attendanceDate.format("YYYY-MM-DD"),
          to_date: attendanceDate.format("YYYY-MM-DD"),
        },
      });
      setAttendanceData(res.data?.data || []);
      const records = {};
      const amounts = {};

      res.data?.data?.forEach((att) => {

        records[att.party_id] = att.attendance_status;

        let amount = 0;

        if (att.attendance_status === "Present") {

          const base = Number(att.salary_amount) * Number(att.shift_count);
          const ot = Number(att.overtime_hours) * Number(att.overtime_rate);

          amount = base + ot;
        }

        if (att.attendance_status === "Paid Leave") {
          amount = Number(att.salary_amount);
        }

        amounts[att.party_id] = amount;
      });

      setAttendanceAmount(amounts);

      setAttendanceRecords(records);


      // Reset manual selections when date changes
      setAttendanceStatus({});
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setAttendanceRecords({});
      setAttendanceStatus({});
    }
  };

  useEffect(() => {
    if (projectId && attendanceDate) fetchAttendance();
  }, [projectId, attendanceDate]);

  const handleStatusChange = (partyId, status) => {

    const previousStatus =
      attendanceStatus[partyId] ?? attendanceRecords[partyId] ?? null;

    // prevent reopening popup if already Present
    if (previousStatus === "Present" && status === "Present") {
      return;
    }

    if (previousStatus === "Present" && status !== "Present") {
      setPendingPartyId(partyId);
      setPendingStatus(status);
      setConfirmOpen(true);
      return;
    }

    if (status === "Present") {

      const existing = attendanceData?.find(
        (a) => a.party_id === partyId
      );

      setSelectedParty(partyId);
      setSelectedAttendance(existing || null);
      setOpenAttendancePopup(true);
    }

    setAttendanceStatus((prev) => ({
      ...prev,
      [partyId]: status ?? null,
    }));
  };
  const handleConfirmRemoveSalary = () => {

    if (pendingPartyId) {
      setAttendanceStatus((prev) => ({
        ...prev,
        [pendingPartyId]: pendingStatus,
      }));

      // reset amount immediately
      setAttendanceAmount((prev) => ({
        ...prev,
        [pendingPartyId]: 0
      }));
    }


    setConfirmOpen(false);
    setPendingPartyId(null);
    setPendingStatus(null);
  };

  const handleApplyAttendance = async (partyId) => {
    try {
      const status = attendanceStatus[partyId] ?? attendanceRecords[partyId] ?? null;

      if (status === "Present") {
        toast.info("Use popup to save Present attendance");
        return;
      }

      if (!status) {
        // If cleared, delete the record (or send empty status depending on your API)
        await api.delete("/attendance", {
          data: {
            project_id: projectId,
            party_id: partyId,
            attendance_date: attendanceDate.format("YYYY-MM-DD"),
          },
        });
      } else {
        // Normal update
        await api.post("/attendance", {
          project_id: projectId,
          party_id: partyId,
          attendance_date: attendanceDate.format("YYYY-MM-DD"),
          shift_count: 1,
          overtime_hours: 0,
          attendance_status: status,
          status: 1,
        });
      }

      // Refetch updated attendance
      const res = await api.get("/attendance", {
        params: {
          project_id: projectId,
          from_date: attendanceDate.format("YYYY-MM-DD"),
          to_date: attendanceDate.format("YYYY-MM-DD"),
        },
      });

      const records = {};
      res.data?.data?.forEach((att) => {
        records[att.party_id] = att.attendance_status;
      });

      setAttendanceRecords(records);
      setAttendanceStatus((prev) => ({ ...prev, [partyId]: undefined }));

      toast.success(`Attendance updated successfully!`);
    } catch (err) {
      console.error("Error saving attendance:", err);
      toast.error("Failed to update attendance");
    }
  };

  const filteredMembers = members.filter((m) =>
    m.party?.party_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Grid container justifyContent="flex-end" alignItems="right">
        <Grid display="flex" align="right" gap={1}>
          <Button
            onClick={() => setOpenDrawer(true)}
            sx={{ color: "white", background: "violet", height: 40 }}
          >
            + Add Site Staff
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ borderBottomWidth: 2, mt: 3 }} />

      <Grid container justifyContent="space-between" mt={2} gap={2}>
        <Grid xs={12} sm={6} md={6} display="flex" gap={2} alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={attendanceDate}
              onChange={(newValue) => setAttendanceDate(newValue)}
              format="DD-MM-YYYY"
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
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#e8e9ed" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Daily Amount</strong></TableCell>
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
            {!loading && filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                  No staff found. Please add members.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              filteredMembers.map((member) => {
                const key = member.party_id; // use party_id as key
                const currentStatus = attendanceStatus[key] ?? attendanceRecords[key] ?? "Empty";

                return (
                  <TableRow key={key}>
                    <TableCell>{member.party.party_name}</TableCell>
                    <TableCell align="center">
                      ₹{attendanceAmount[key] || 0}
                    </TableCell>
                    <TableCell
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      align="right"
                    >
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!attendanceStatus[key] && !attendanceRecords[key]}
                        onClick={() => handleApplyAttendance(key)}
                      >
                        Apply
                      </Button>

                      <Autocomplete
                        options={Options}
                        size="small"
                        disableClearable={false} // allows clearing
                        value={currentStatus === "Empty" ? null : currentStatus} // null allows empty selection
                        onChange={(_, value) => handleStatusChange(key, value || null)} // store null if cleared
                        renderInput={(params) => <TextField {...params} placeholder="Select" />}
                        sx={{ width: 130 }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          ml: 1,
                          color: attendanceRecords[key] ? "green" : "text.secondary",
                          minWidth: 60,
                          textAlign: "right",
                        }}
                      >
                        {attendanceRecords[key] || "Empty"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <AddStaff
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        projectId={projectId}
        onAdded={() => dispatch(fetchProjectMembers(projectId))}
      />
      <AttendancePopup
        open={openAttendancePopup}
        partyId={selectedParty}
        attendance={selectedAttendance}
        projectId={projectId}
        attendanceDate={attendanceDate}
        onSaved={() => {
          fetchAttendance();
        }}
        onClose={() => setOpenAttendancePopup(false)}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove Salary?</DialogTitle>

        <DialogContent>
          <Typography>
            Changing attendance will remove today's salary. Are you sure?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmRemoveSalary}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProjectAttendance;