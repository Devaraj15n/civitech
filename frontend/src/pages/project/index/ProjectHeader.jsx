import { Box, Typography, Chip, Stack } from "@mui/material";

export default function ProjectHeader({ project }) {
  // console.log("project");
  // console.log(project);
  
  return (
    <Box
      p={2}
      mb={1}
      borderRadius={2}
      bgcolor="#fff"
      boxShadow="0 1px 4px rgba(0,0,0,0.08)"
    >
      <Typography variant="h6" fontWeight={600}>
        {project.project_name}
      </Typography>

      <Stack direction="row" spacing={2} mt={1} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Code: {project.project_code}
        </Typography>

        {/* <Typography variant="body2" color="text.secondary">
          Client: {project.client_id}
        </Typography> */}

        <Chip
          label={project.project_status}
          size="small"
          
        />

        <Typography variant="body2" color="text.secondary">
          {project.start_date} → {project.end_date}
        </Typography>
      </Stack>
    </Box>
  );
}
