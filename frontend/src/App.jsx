import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AppRoutes />
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // auto hide after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // optional, matches Material-UI
      />
    </>
  );
}
