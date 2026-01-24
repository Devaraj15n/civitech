import api from "../../../api/axios";

/* GET all parties */
export const getParties = () => {
  return api.get("/parties");
};

/* CREATE / UPDATE party */
export const savePartyApi = (data) => {
  return data.id
    ? api.put(`/parties/${data.id}`, data)
    : api.post("/parties", data);
};
