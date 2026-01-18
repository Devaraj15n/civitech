import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import LoginBanner from "./LoginBanner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunk";
import { toast } from "react-toastify";

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleNext = () => {
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep(2);
  };

  const handleLogin = () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    dispatch(loginUser({ phone: mobile, password }))
      .unwrap()
      .then(() => toast.success("Login successful!"))
      .catch(() => {});
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <LoginBanner />
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box width="100%" maxWidth={360} p={3}>
          <Typography variant="h5" mb={1}>
            Welcome Back
          </Typography>
          <Typography variant="body2" mb={3} color="text.secondary">
            Please login to continue
          </Typography>

          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleNext}
                disabled={loading}
              >
                Continue
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Typography mb={1}>+91 {mobile}</Typography>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button fullWidth sx={{ mt: 1 }} onClick={() => setStep(1)}>
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
