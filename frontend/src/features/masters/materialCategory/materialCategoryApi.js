import api from "../../../api/axios";

/* ================= GET ================= */
export const getMaterialCategories = () => {
  return api.get("/material-categories");
};

/* ================= CREATE ================= */
export const createMaterialCategory = (data) => {
  return api.post("/material-categories", data);
};

/* ================= UPDATE ================= */
export const updateMaterialCategory = (id, data) => {
  return api.put(`/material-categories/${id}`, data);
};

/* ================= DELETE (OPTIONAL) ================= */
export const deleteMaterialCategory = (id) => {
  return api.delete(`/material-categories/${id}`);
};
