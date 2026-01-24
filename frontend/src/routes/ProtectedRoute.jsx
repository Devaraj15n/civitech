import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      dispatch(logout());
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
