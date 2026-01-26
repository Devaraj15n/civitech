import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import PartyLibraryForm from "./PartyLibraryForm";
import { fetchParties, saveParty } from "../../../features/masters/party/partySlice";
import { fetchPartyTypes } from "../../../features/masters/partyType/partyTypeSlice";
import { showSuccess, showError } from "../../../utils/toastHelper";

const PartyList = () => {
  const dispatch = useDispatch();

  const { list: rows = [], loading = false } = useSelector((s) => s.party);

  const { list: partyTypes = [] } = useSelector((s) => s.partyType);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Corporate data loading
  useEffect(() => {
    dispatch(fetchParties());
    dispatch(fetchPartyTypes());
  }, [dispatch]);

  // 🔹 Save handler (same pattern as Material)
  const handleSave = async (form) => {
    const payload = {
      id: form.id,
      party_name: form.party_name,
      email: form.email,
      phone: form.mobile,
      address: form.address,
      party_type_id: form.party_type_id,
      gst_number: form.gst_no,
    };

    try {
      await dispatch(saveParty(payload)).unwrap();

      showSuccess({
        data: {
          message: payload.id
            ? "Party updated successfully"
            : "Party created successfully",
        },
      });

      setOpen(false);
      dispatch(fetchParties());
    } catch (err) {
      showError(err);
    }
  };

  // 🔹 Corporate mapping (fast + clean)
  const partyTypeMap = useMemo(() => {
    const map = {};
    partyTypes.forEach((p) => {
      map[p.id] = p.party_type; // ✅ correct field
    });
    return map;
  }, [partyTypes]);

  useEffect(() => {
  console.log("partyTypes from redux:", partyTypes);
}, [partyTypes]);

  return (
    <>
      <MasterList
        title="Party Library"
        rows={rows}
        loading={loading}
        columns={[
          {
            field: "party_name",
            headerName: "Party Name",
            flex: 1,
          },
          {
            field: "party_type_id",
            headerName: "Party Type",
            flex: 1,
            valueGetter: (params) => {
              return partyTypeMap[params] || "-";;
            },
          },
          {
            field: "phone",
            headerName: "Mobile",
            width: 140,
          },
          {
            field: "gst_number",
            headerName: "GST No",
            width: 170,
          },
          {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: ({ row }) => (row.status === 1 ? "Active" : "Inactive"),
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

      <PartyLibraryForm
        open={open}
        data={editData}
        partyTypes={partyTypes}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default PartyList;
