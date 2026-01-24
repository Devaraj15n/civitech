import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import MaterialLibraryForm from "./MaterialLibraryForm";
import {
  fetchMaterials,
  saveMaterial,
} from "../../../features/masters/material/materialSlice";
import { fetchMaterialCategories } from "../../../features/masters/materialCategory/materialCategorySlice";
import { showSuccess, showError } from "../../../utils/toastHelper";

const MaterialLibraryList = () => {
  const dispatch = useDispatch();

  const { list: rows, loading } = useSelector((s) => s.material);
  const { list: categories } = useSelector((s) => s.materialCategory);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchMaterials());
    dispatch(fetchMaterialCategories());
  }, [dispatch]);

  const handleSave = async (data) => {
    try {
      const res = await dispatch(saveMaterial(data)).unwrap();

      // ✅ Corporate success toast
      showSuccess({
        data: {
          message: data.id
            ? "Material updated successfully"
            : "Material created successfully",
        },
      });

      setOpen(false); // close only on success
      dispatch(fetchMaterials()); // refresh list (optional but best)
    } catch (err) {
      // ❌ Backend duplicate / validation error
      showError(err);
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
            flex: 1,
          },
          {
            field: "material_category_id",
            headerName: "Category",
            flex: 1,
            renderCell: ({ row }) => {
              const category = categories.find(
                (c) => c.id === row.material_category_id
              );
              return category?.category_name || "-";
            },
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

      <MaterialLibraryForm
        open={open}
        data={editData}
        categories={categories}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default MaterialLibraryList;
