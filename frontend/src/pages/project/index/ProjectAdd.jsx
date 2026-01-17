import {
  Box,
  Card,
  TextField,
  Button,
  Grid
} from "@mui/material";

export default function ProjectAdd() {
  return (
    <Card sx={{ p: 3, maxWidth: 900 }}>
      <Grid container spacing={2}>
        <Grid  size={6}>
          <TextField label="Project Code" fullWidth />
        </Grid>
        <Grid  size={6}>
          <TextField label="Project Name" fullWidth />
        </Grid>

        <Grid  size={6}>
          <TextField type="date" label="Start Date" fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid  size={6}>
          <TextField type="date" label="End Date" fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>

        <Grid  size={12}>
          <TextField label="Project Address" fullWidth multiline rows={3} />
        </Grid>

        <Grid  xs={12}>
          <Button variant="contained">
            Save & Continue
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
