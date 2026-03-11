import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Button,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Box
} from "@mui/material";

import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { showSuccess, showError } from "../../../utils/toastHelper";


function AttendancePopup({ open, onClose, onSaved, partyId, projectId, attendance, attendanceDate }) {
    const [salary, setSalary] = useState(0);
    const [overtimeRate, setOvertimeRate] = useState(0);
    const [shift, setShift] = useState(1);
    const [overtime, setOvertime] = useState(0);

    /* -------- Calculations -------- */

    const baseAmount = salary * shift;
    const overtimeAmount = overtime * overtimeRate;
    const totalAmount = baseAmount + overtimeAmount;

    useEffect(() => {
        if (open) {
            setShift(1);
            setOvertime(0);
        }
    }, [open]);


    /* -------- Fetch Payroll -------- */

    useEffect(() => {

        if (!partyId) return;

        const fetchPayroll = async () => {

            try {

                const res = await api.get(`/party-payroll/party/${partyId}`);

                // if (!res.data?.data?.length) return;

                const payroll =  res?.data?.data || {};
                setSalary(Number(payroll.salary_amount) || 0);
                setOvertimeRate(Number(payroll.overtime_rate) || 0);

                setShift(Number(payroll.shift_count) || 1);
                setOvertime(Number(payroll.overtime_hours) || 0);

            } catch (error) {

                console.error("Payroll fetch error", error);

            }

        };

        fetchPayroll();

    }, [partyId, open]);

    useEffect(() => {
        if (attendance) {
            setShift(Number(attendance.shift_count) || 1);
            setOvertime(Number(attendance.overtime_hours) || 0);
        }
    }, [attendance]);


    const handleSave = async () => {
        try {

            const payload = {
                project_id: projectId,
                party_id: partyId,
                attendance_date: attendanceDate.format("YYYY-MM-DD"),
                shift_count: shift,
                overtime_hours: overtime,
                salary_amount: salary,
                overtime_rate: overtimeRate,
                total_amount: totalAmount,
                attendance_status: "Present",

            };

            console.log("Saving Attendance:", payload);

            await api.post("/attendance", payload);
            showSuccess("Attendance Saved");
            onSaved();   // refresh parent

            onClose(); // close popup

        } catch (error) {

            console.error("Save error", error);
            showError("Failed to save attendance");
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

            <DialogTitle sx={{ fontWeight: 600 }}>
                Attendance
            </DialogTitle>

            <DialogContent>

                {/* Amount Calculation */}
                <Box
                    sx={{
                        background: "#f4f5f9",
                        p: 2,
                        borderRadius: 2,
                        mb: 3
                    }}
                >

                    <Typography fontWeight={500}>
                        Amount Calculation
                    </Typography>

                    <Typography variant="body1">
                        {salary} × {shift} = ₹{baseAmount}
                    </Typography>

                    {overtime > 0 && (
                        <Typography variant="body2" color="text.secondary">
                            Overtime: {overtime} × {overtimeRate} = ₹{overtimeAmount}
                        </Typography>
                    )}

                    <Typography variant="h6" sx={{ mt: 1 }}>
                        Total: ₹{totalAmount}
                    </Typography>

                </Box>

                {/* Date */}
                <Typography sx={{ mb: 2 }}>
                    {attendanceDate.format("DD-MM-YYYY")}
                </Typography>

                {/* Shift */}
                <Typography fontWeight={500} mb={1}>
                    Shift
                </Typography>

                <ToggleButtonGroup
                    exclusive
                    value={shift}
                    onChange={(e, val) => val && setShift(val)}
                    sx={{ mb: 3 }}
                >
                    <ToggleButton value={0.25}>0.25</ToggleButton>
                    <ToggleButton value={0.5}>0.5</ToggleButton>
                    <ToggleButton value={0.75}>0.75</ToggleButton>
                    <ToggleButton value={1}>1</ToggleButton>
                </ToggleButtonGroup>

                {/* Overtime */}
                <Grid container spacing={2} alignItems="center" mb={3}>

                    <Grid item xs={6}>
                        <Typography>Over Time (Hours)</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            size="small"
                            fullWidth
                            inputProps={{ min: 0 }}
                            value={overtime}
                            onChange={(e) => setOvertime(Math.max(0, Number(e.target.value)))}
                        />
                    </Grid>

                </Grid>

                {/* Save Button */}
                <Box display="flex" justifyContent="flex-end">

                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>

                </Box>

            </DialogContent>

        </Dialog>
    );
}

export default AttendancePopup;