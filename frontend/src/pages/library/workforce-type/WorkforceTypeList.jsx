import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import WorkforceTypeForm from "./WorkforceTypeForm";
import { fetchWorkforceTypes, saveWorkforceType } from "../../../features/masters/workforceType/workforceTypeSlice.js";
import { showSuccess, showError } from "../../../utils/toastHelper";

const WorkforceTypeList = () => {
  const dispatch = useDispatch();

  // Redux state for workforce types
  const { list: rows = [], loading = false } = useSelector((s) => s.workforceType);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Load workforce types on mount
  useEffect(() => {
    dispatch(fetchWorkforceTypes());
  }, [dispatch]);

  // 🔹 Save handler (create/update)
  const handleSave = async (form) => {
    try {
      await dispatch(saveWorkforceType(form)).unwrap();

      showSuccess({
        data: {
          message: form.id
            ? "Workforce type updated successfully"
            : "Workforce type created successfully",
        },
      });

      setOpen(false);
      dispatch(fetchWorkforceTypes()); // refresh the list
    } catch (err) {
      showError(err);
    }
  };

  return (
    <>
      <MasterList
        title="Workforce Type Master"
        rows={rows}
        loading={loading}
        columns={[
          { field: "worker_type", headerName: "Worker Type", flex: 1 },
          { field: "employment_type", headerName: "Employment Type", width: 140 },
          { field: "salary_per_hour", headerName: "Salary per Hour", width: 150 },
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

      <WorkforceTypeForm
        open={open}
        data={editData}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default WorkforceTypeList;
