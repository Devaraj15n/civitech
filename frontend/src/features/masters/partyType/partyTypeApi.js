import api from "../../../api/axios"; // adjust path if needed

export const getPartyTypes = () => {
  return api.get("/party-types");
};

export const createPartyType = (data) => {
  return api.post("/party-types", data);
};

export const updatePartyType = (id, data) => {
  return api.put(`/party-types/${id}`, data);
};
