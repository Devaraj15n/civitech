import api from "../../api/axios";

/* ================= GET ================= */
export const getMaterials = () => {
  return api.get("/materials");
};

/* ================= CREATE ================= */
export const createMaterial = (data) => {
  return api.post("/materials", data);
};

/* ================= UPDATE ================= */
export const updateMaterial = (id, data) => {
  return api.put(`/materials/${id}`, data);
};

/* ================= DELETE (OPTIONAL) ================= */
export const deleteMaterial = (id) => {
  return api.delete(`/materials/${id}`);
};
