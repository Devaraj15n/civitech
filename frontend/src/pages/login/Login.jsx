import { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment
} from "@mui/material";
import LoginBanner from "./LoginBanner";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleNext = () => {
    if (mobile.length === 10) setStep(2);
  };

  const handleLogin = () => {
    console.log({ mobile, password });
    // After successful login
    navigate("/dashboard");
  };

  return (
    <Grid
      container
      sx={{ minHeight: "100vh" }}
    >
      {/* Left Banner */}
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: { xs: "none", md: "block" }
        }}
      >
        <LoginBanner />
      </Grid>

      {/* Right Form */}
      <Grid
        item
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box width="100%" maxWidth={360} p={3}>
          <Typography variant="h5" mb={1}>
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            mb={3}
            color="text.secondary"
          >
            Please login to continue
          </Typography>

          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Mobile Number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, ""))
                }
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      +91
                    </InputAdornment>
                  )
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleNext}
                disabled={mobile.length !== 10}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography mb={1}>
                +91 {mobile}
              </Typography>

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Button
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => setStep(1)}
              >
                Change Mobile Number
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
