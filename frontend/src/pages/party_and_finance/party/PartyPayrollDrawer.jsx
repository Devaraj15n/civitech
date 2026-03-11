import {
    Drawer,
    Box,
    TextField,
    Button,
    MenuItem,
    Typography
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../../api/axios";
import { showSuccess, showError } from "../../../utils/toastHelper";


const PartyPayrollDrawer = ({ open, onClose, party }) => {

    const [form, setForm] = useState({
        party_id: "",
        salary_amount: "",
        salary_type: "Monthly",
        shift_hours: "",
        overtime_rate: ""
    });

    const [loading, setLoading] = useState(false);

    /* ================= Fetch Payroll Details ================= */

    const fetchPayroll = async (partyId) => {
        try {
            setLoading(true);

            const res = await api.get(`/party-payroll/party/${partyId}`);
            

            const payroll = res?.data;

            if (payroll) {
                setForm({
                    party_id: payroll.party_id || partyId,
                    salary_amount: payroll.salary_amount || "",
                    salary_type: payroll.salary_type || "Monthly",
                    shift_hours: payroll.shift_hours || "",
                    overtime_rate: payroll.overtime_rate || ""
                });
            } else {
                setForm((prev) => ({
                    ...prev,
                    party_id: partyId
                }));
            }

        } catch (err) {
            console.error("Payroll fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ================= Load Payroll When Drawer Opens ================= */

    // useEffect(() => {
    //     if (open && party?.id) {

    //         setForm((prev) => ({
    //             ...prev,
    //             party_id: party.id
    //         }));

    //         fetchPayroll(party.id);
    //     }
    // }, [open, party]);

    useEffect(() => {
        if (open && party?.id) {
            fetchPayroll(party.id);
        }
    }, [open, party]);

    useEffect(() => {
        if (!open) {
            setForm({
                party_id: "",
                salary_amount: "",
                salary_type: "Monthly",
                shift_hours: "",
                overtime_rate: ""
            });
        }
    }, [open]);

    /* ================= Handle Input Change ================= */

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    /* ================= Submit Payroll ================= */

    const handleSubmit = async () => {

        if (!form.party_id) {
            showError({ message: "Party ID missing" });
            return;
        }

        if (!form.salary_amount) {
            showError({ message: "Salary amount required" });
            return;
        }

        try {
            const res = await api.post("/party-payroll", form);

            showSuccess(res?.data?.message || "Salary saved successfully");

            onClose();

        } catch (err) {
            console.error("Payroll save error:", err);
            showError(err);
        }
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box width={400} p={3}>

                <Typography variant="h6" mb={2}>
                    {party ? `Salary for ${party.party_name}` : "Add Labour Salary"}
                </Typography>

                {/* Labour Name */}
                <TextField
                    fullWidth
                    label="Labour"
                    value={party?.party_name || ""}
                    margin="normal"
                    disabled
                />

                {/* Salary Amount */}
                <TextField
                    fullWidth
                    label="Salary Amount"
                    name="salary_amount"
                    value={form.salary_amount}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Salary Type */}
                <TextField
                    select
                    fullWidth
                    label="Salary Type"
                    name="salary_type"
                    value={form.salary_type}
                    onChange={handleChange}
                    margin="normal"
                >
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Per Shift">Per Shift</MenuItem>
                </TextField>

                {/* Shift Hours */}
                <TextField
                    fullWidth
                    label="Shift Hours"
                    name="shift_hours"
                    value={form.shift_hours}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Overtime Rate */}
                <TextField
                    fullWidth
                    label="Overtime Rate"
                    name="overtime_rate"
                    value={form.overtime_rate}
                    onChange={handleChange}
                    margin="normal"
                />

                {/* Save Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                    disabled={loading || !form.salary_amount || !form.shift_hours}
                >
                    {loading ? "Loading..." : "Save"}
                </Button>

            </Box>
        </Drawer>
    );
};

export default PartyPayrollDrawer;