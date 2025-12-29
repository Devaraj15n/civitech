import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import PartyLibraryForm from "./PartyLibraryForm";

// MOCK PARTY TYPE MASTER
const partyTypeMaster = [
  { id: 1, party_type: "Vendor" },
  { id: 2, party_type: "Client" },
  { id: 3, party_type: "Contractor" }
];

// MOCK PARTY DATA
const mockData = [
  {
    id: 1,
    party_name: "ABC Cement Suppliers",
    party_type_id: 1,
    mobile: "9876543210",
    email: "abc@cement.com",
    gst_no: "27ABCDE1234F1Z5",
    status: 1
  },
  {
    id: 2,
    party_name: "XYZ Builders",
    party_type_id: 2,
    mobile: "9123456780",
    email: "xyz@builders.com",
    gst_no: "",
    status: 1
  }
];

const PartyLibraryList = () => {
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
        title="Party Library"
        rows={rows}
        loading={loading}
        columns={[
          {
            field: "party_name",
            headerName: "Party Name",
            flex: 1
          },
          {
            field: "party_type_id",
            headerName: "Party Type",
            flex: 1,
            valueGetter: (params) =>
              partyTypeMaster.find(
                (p) => p.id === params.row?.party_type_id
              )?.party_type || "-"
          },
          {
            field: "mobile",
            headerName: "Mobile",
            width: 140
          },
          {
            field: "gst_no",
            headerName: "GST No",
            width: 170
          },
          {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) =>
              params.row?.status === 1 ? "Active" : "Inactive"
          }
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
        partyTypes={partyTypeMaster}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default PartyLibraryList;
