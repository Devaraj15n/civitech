import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import PartyTypeForm from "./PartyTypeForm";
import {
  fetchPartyTypes,
  savePartyType,
} from "../../../features/masters/partyType/partyTypeSlice";
import { showSuccess, showError } from "../../../utils/toastHelper";

const PartyTypeList = () => {
  const dispatch = useDispatch();

  const { list: rows = [], loading } = useSelector(
    (s) => s.partyType || {}
  );

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchPartyTypes());
  }, [dispatch]);

  /* ================= SAVE ================= */
  const handleSave = async (data) => {
    try {
      await dispatch(
        savePartyType({
          id: data.id,
          party_type: data.party_type,
          status: data.status,
        })
      ).unwrap();

      showSuccess({
        data: { message: "Saved successfully" },
      });

      setOpen(false);
      dispatch(fetchPartyTypes());
    } catch (error) {
      showError(error);
    }
  };

  return (
    <>
      <MasterList
        title="Party Type Master"
        rows={rows}
        loading={loading}
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
