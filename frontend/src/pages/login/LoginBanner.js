import { Box } from "@mui/material";
import bannerImage from "../../assets/login-banner.jpg";

const LoginBanner = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${bannerImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    />
  );
};

export default LoginBanner;
