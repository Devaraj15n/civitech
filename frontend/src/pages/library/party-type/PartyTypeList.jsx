import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import PartyTypeForm from "./PartyTypeForm";

// TEMP MOCK DATA
const mockData = [
  { id: 1, party_type: "Vendor", status: 1 },
  { id: 2, party_type: "Client", status: 1 },
  { id: 3, party_type: "Labour Contractor", status: 1 }
];

const PartyTypeList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setRows(mockData);
    setLoading(false);
  };

  const handleSave = (data) => {
    if (data.id) {
      // UPDATE
      setRows((prev) =>
        prev.map((r) => (r.id === data.id ? data : r))
      );
    } else {
      // CREATE
      setRows((prev) => [
        ...prev,
        { ...data, id: Date.now(), status: 1 }
      ]);
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
            flex: 1
          },
          {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) =>
              params.row?.status === 1 ? "Active" : "Inactive"
          }
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
