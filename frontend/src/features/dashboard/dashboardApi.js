// features/dashboard/dashboardApi.js
import api from "../../api/axios";

export const getDashboardSummary = () =>
  api.get("/dashboard/summary");
