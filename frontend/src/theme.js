import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: 500
    }
  },

  components: {
    /* ================= TEXT FIELD ================= */
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium"
      }
    },

    /* ================= INPUT ================= */
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontFamily: `"Poppins", sans-serif`,

          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "0.7px"
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "0.9px"
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px"
          },

          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px"
          }
        },

        input: {
          padding: "12px",
          fontSize: "14px",          // ⬆ increased

          "&::placeholder": {
            fontSize: "13px",        // ⬆ increased
            opacity: 0.6
          }
        }
      }
    },

    /* ================= LABEL ================= */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: `"Poppins", sans-serif`,
          fontSize: "13px",          // ⬆ increased
          fontWeight: 500
        },
        shrink: {
          fontSize: "12px"           // ⬆ increased
        }
      }
    },

    /* ================= SELECT ================= */
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: `"Poppins", sans-serif`,
          fontSize: "14px",          // ⬆ increased
          padding: "12px"
        }
      }
    },

    /* ================= BUTTON ================= */
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: `"Poppins", sans-serif`,
          borderRadius: 8,
          padding: "10px 16px",
          fontSize: "13px"
        }
      }
    }
  }
});

export default theme;
