import api from "./index";

// Login API
export const loginUser = async (phone, password) => {
  try {
    const response = await api.post("/auth/login", { phone, password });
    return response.data; // contains token, user info
  } catch (error) {
    // throw error to be handled in component
    throw error.response?.data || { message: "Login failed" };
  }
};
