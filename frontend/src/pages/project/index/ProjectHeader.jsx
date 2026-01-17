import { Box, Typography, Chip, Stack } from "@mui/material";

export default function ProjectHeader({ project }) {
  return (
    <Box
      p={2}
      mb={1}
      borderRadius={2}
      bgcolor="#fff"
      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
    >
      <Typography variant="h6" fontWeight={600}>
        {project.name}
      </Typography>

      <Stack direction="row" spacing={2} mt={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Code: {project.code}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Client: {project.client}
        </Typography>

        <Chip
          label={project.status}
          size="small"
          color={project.status === "Active" ? "success" : "default"}
        />

        <Typography variant="body2" color="text.secondary">
          {project.startDate} → {project.endDate}
        </Typography>
      </Stack>
    </Box>
  );
}
