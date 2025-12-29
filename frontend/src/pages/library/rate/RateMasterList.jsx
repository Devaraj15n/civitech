import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import RateMasterForm from "./RateMasterForm";

// MOCK RATE DATA
const mockData = [
  {
    id: 1,
    item_name: "Cement OPC 53",
    item_code: "MAT-OPC-53",
    unit: "Bag",
    gst_percentage: 28,
    cost_component: "Material",
    unit_cost_price: 350,
    markup_percentage: 10,
    additional_fees: 0,
    unit_sale_price: 385
  },
  {
    id: 2,
    item_name: "Masonry Labour",
    item_code: "LAB-MAS",
    unit: "Day",
    gst_percentage: 0,
    cost_component: "Labour",
    unit_cost_price: 900,
    markup_percentage: 15,
    additional_fees: 0,
    unit_sale_price: 1035
  }
];

const RateMasterList = () => {
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
      setRows((prev) =>
        prev.map((r) => (r.id === data.id ? data : r))
      );
    } else {
      setRows((prev) => [
        ...prev,
        { ...data, id: Date.now() }
      ]);
    }
  };

  return (
    <>
      <MasterList
        title="Rate Master"
        rows={rows}
        loading={loading}
        columns={[
          {
            field: "item_name",
            headerName: "Item Name",
            flex: 1
          },
          {
            field: "item_code",
            headerName: "Code",
            width: 140
          },
          {
            field: "cost_component",
            headerName: "Component",
            width: 130
          },
          {
            field: "unit",
            headerName: "Unit",
            width: 100
          },
          {
            field: "unit_cost_price",
            headerName: "Cost Price",
            width: 130
          },
          {
            field: "unit_sale_price",
            headerName: "Sale Price",
            width: 130
          },
          {
            field: "gst_percentage",
            headerName: "GST %",
            width: 90
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

      <RateMasterForm
        open={open}
        data={editData}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default RateMasterList;
