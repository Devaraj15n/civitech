import api from "../../../api/axios";

export const getRates = () => api.get("/rates");
export const createRate = (data) => api.post("/rates", data);
export const updateRate = (id, data) => api.put(`/rates/${id}`, data);
