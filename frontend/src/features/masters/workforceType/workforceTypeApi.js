import api from "../../../api/axios";

export const getWorkforceTypes = () => api.get("/workforce-types");
export const createWorkforceType = (data) => api.post("/workforce-types", data);
export const updateWorkforceType = (id, data) => api.put(`/workforce-types/${id}`, data);
