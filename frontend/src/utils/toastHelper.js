import { toast } from "react-toastify";

const config = {
  autoClose: 4000,
  hideProgressBar: true,
};

/* Success */
export const showSuccess = (res, fallback = "Success") => {
  toast.success(res?.data?.message || fallback, config);
};

/* ❌ Error (RTK + Axios safe) */
export const showError = (err, fallback = "Something went wrong") => {
  const message =
    err?.response?.data?.message || // Axios error
    err?.data?.message ||           // RTK rejectWithValue
    err?.message ||                 // RTK unwrap()
    fallback;

  toast.error(message, config);
};

export const showInfo = (msg) => toast.info(msg, config);
export const showWarning = (msg) => toast.warning(msg, config);
