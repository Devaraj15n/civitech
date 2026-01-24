import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/toast.css";

export default function App() {
  return (
    <>
      <AppRoutes />
      {/* Global Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="light"
        toastClassName="corp-toast"
        bodyClassName="corp-toast-body"
      />
    </>
  );
}
