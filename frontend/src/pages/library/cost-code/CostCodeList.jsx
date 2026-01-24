import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import CostCodeForm from "./CostCodeForm";
import {
  fetchCostCodes,
  saveCostCode,
} from "../../../features/masters/costCode/costCodeSlice";
import { showSuccess, showError } from "../../../utils/toastHelper";

const CostCodeList = () => {
  const dispatch = useDispatch();

  const { list: rows = [], loading = false } = useSelector((s) => s.costCode);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Load data
  useEffect(() => {
    dispatch(fetchCostCodes());
  }, [dispatch]);

  // 🔹 Save handler (same as Party)
  const handleSave = async (form) => {
    try {
      await dispatch(saveCostCode(form)).unwrap();

      showSuccess({
        data: {
          message: form.id
            ? "Cost code updated successfully"
            : "Cost code created successfully",
        },
      });

      setOpen(false);
      dispatch(fetchCostCodes());
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <MasterList
        title="Cost Code Master"
        rows={rows}
        loading={loading}
        columns={[
          {
            field: "cost_code",
            headerName: "Cost Code",
            width: 160,
          },
          {
            field: "name",
            headerName: "Cost Name",
            flex: 1,
          },
          {
            field: "parent_cost_code_id",
            headerName: "Parent Cost Code",
            flex: 1,
            valueGetter: (params) => {
              const row = params?.row;
              if (!row || !row.parent_cost_code_id) return "-";
              const parent = rows.find((r) => r.id === row.parent_cost_code_id);
              return parent?.cost_code || "-";
            },
          },
          {
            field: "cost_component",
            headerName: "Component",
            width: 140,
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

      <CostCodeForm
        open={open}
        data={editData}
        rows={rows}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default CostCodeList;
