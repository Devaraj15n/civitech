import { toast } from "react-toastify";

const config = {
  autoClose: 4000,
  hideProgressBar: true,
};

/* Success */
export const showSuccess = (res, fallback = "Success") => {
  toast.success(res?.data?.message || fallback, config);
};

/* Error */
export const showError = (err, fallback = "Something went wrong") => {
  toast.error(
    err?.response?.data?.message || fallback,
    config
  );
};

export const showInfo = (msg) => toast.info(msg, config);
export const showWarning = (msg) => toast.warning(msg, config);
