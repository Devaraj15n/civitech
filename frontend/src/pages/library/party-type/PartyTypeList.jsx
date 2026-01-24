import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import PartyTypeForm from "./PartyTypeForm";
import {
  getPartyTypes,
  createPartyType,
  updatePartyType,
} from "../../../features/partyType/partyTypeApi";
import { showSuccess, showError } from "../../../utils/toastHelper";


const PartyTypeList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPartyTypes();

      setRows(res.data?.data || []); // ✅ FIX
    } catch (error) {
      console.error("Failed to fetch party types", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async (data) => {
  try {
    setLoading(true);

    let res;

    if (data.id) {
      res = await updatePartyType(data.id, {
        party_type: data.party_type,
        status: data.status,
      });
    } else {
      res = await createPartyType({
        party_type: data.party_type,
        status: data.status,
      });
    }

    showSuccess(res, "Saved successfully");

    setOpen(false);
    fetchData();
  } catch (error) {
    showError(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <MasterList
        title="Party Type Master"
        columns={[
          {
            field: "party_type",
            headerName: "Party Type",
            flex: 1,
          },
          {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) =>
              params.row?.status === 1 ? "Active" : "Inactive",
          },
        ]}
        rows={rows}
        loading={loading}
        onAdd={() => {
          setEditData(null);
          setOpen(true);
        }}
        onEdit={(row) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      <PartyTypeForm
        open={open}
        data={editData}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default PartyTypeList;
