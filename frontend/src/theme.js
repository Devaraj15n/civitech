import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,

    h5: {
      fontWeight: 600
    },
    body1: {
      fontWeight: 400
    },
    body2: {
      fontWeight: 400
    },
    button: {
      textTransform: "none",
      fontWeight: 500
    }
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium"
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: `"Poppins", sans-serif`
        },
        input: {
          padding: "14px",
          fontSize: "14px"
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Poppins", sans-serif`,
          fontSize: "14px"
        }
      }
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: `"Poppins", sans-serif`,
          padding: "14px",
          fontSize: "14px"
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `"Poppins", sans-serif`,
          borderRadius: 8,
          padding: "10px 16px"
        }
      }
    }
  }
});

export default theme;
