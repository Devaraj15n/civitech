import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import MaterialLibraryForm from "./MaterialLibraryForm";

// MOCK CATEGORY MASTER
const categoryMaster = [
  { id: 1, category_name: "Cement" },
  { id: 2, category_name: "Steel" },
  { id: 3, category_name: "Sand" }
];

// MOCK MATERIAL DATA
const mockData = [
  {
    id: 1,
    material_name: "OPC 53 Grade",
    category_id: 1,
    uom: "Bag",
    status: 1
  },
  {
    id: 2,
    material_name: "TMT 12mm",
    category_id: 2,
    uom: "Kg",
    status: 1
  }
];

const MaterialLibraryList = () => {
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
        title="Material Library"
        rows={rows}
        loading={loading}
        columns={[
          {
            field: "material_name",
            headerName: "Material Name",
            flex: 1
          },
          {
            field: "category_id",
            headerName: "Category",
            flex: 1,
            valueGetter: (params) =>
              categoryMaster.find(
                (c) => c.id === params.row?.category_id
              )?.category_name || "-"
          },
          {
            field: "uom",
            headerName: "UOM",
            width: 120
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

      <MaterialLibraryForm
        open={open}
        data={editData}
        categories={categoryMaster}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default MaterialLibraryList;
