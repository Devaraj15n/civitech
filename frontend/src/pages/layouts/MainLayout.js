import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {children}
    </Box>
  );
};

export default MainLayout;
