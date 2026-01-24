import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import RateMasterForm from "./RateMasterForm";
import { fetchRates, saveRate } from "../../../features/masters/rate/rateSlice";
import { showSuccess, showError } from "../../../utils/toastHelper";

const RateMasterList = () => {
  const dispatch = useDispatch();
  const { list: rows = [], loading = false } = useSelector((s) => s.rate);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch rates on mount
  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  // Save handler
  const handleSave = async (form) => {
    try {
      await dispatch(saveRate(form)).unwrap();

      showSuccess({
        data: {
          message: form.id
            ? "Rate updated successfully"
            : "Rate created successfully",
        },
      });

      setOpen(false);
      dispatch(fetchRates()); // refresh the list
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <MasterList
        title="Rate Master"
        rows={rows}
        loading={loading}
        columns={[
          { field: "item_name", headerName: "Item Name", flex: 1 },
          { field: "item_code", headerName: "Code", width: 140 },
          { field: "cost_component", headerName: "Component", width: 130 },
          { field: "unit", headerName: "Unit", width: 100 },
          { field: "unit_cost_price", headerName: "Cost Price", width: 130 },
          { field: "unit_sale_price", headerName: "Sale Price", width: 130 },
          { field: "gst_percentage", headerName: "GST %", width: 90 },
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
