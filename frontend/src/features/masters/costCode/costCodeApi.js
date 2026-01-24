import api from "../../../api/axios";

/* GET */
export const getCostCodes = () => {
  return api.get("/cost-codes");
};

/* CREATE */
export const createCostCode = (data) => {
  return api.post("/cost-codes", data);
};

/* UPDATE */
export const updateCostCode = (id, data) => {
  return api.put(`/cost-codes/${id}`, data);
};
