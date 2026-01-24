import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import MaterialCategoryForm from "./MaterialCategoryForm";
import {
  getMaterialCategories,
  createMaterialCategory,
  updateMaterialCategory,
} from "../../../features/materialCategory/materialCategoryApi";
import { showSuccess, showError } from "../../../utils/toastHelper";

const MaterialCategoryList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMaterialCategories();

      console.log(res.data);

      setRows(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch material categories", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */
  const handleSave = async (data) => {
    try {
      setLoading(true);

      let res;

      if (data.id) {
        // UPDATE
        res = await updateMaterialCategory(data.id, {
          category_name: data.category_name,
          description: data.description,
          status: data.status,
        });
      } else {
        // CREATE
        res = await createMaterialCategory({
          category_name: data.category_name,
          description: data.description,
          status: data.status,
        });
      }

      // ✅ Corporate success toast
      showSuccess(
        res,
        data.id
          ? "Material Category updated successfully"
          : "Material Category created successfully"
      );

      setOpen(false);
      fetchData();
    } catch (error) {
      // ❌ Corporate error toast
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MasterList
        title="Material Category Master"
        columns={[
          {
            field: "category_name",
            headerName: "Category Name",
            flex: 1,
          },
          {
            field: "description",
            headerName: "Description",
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

      <MaterialCategoryForm
        open={open}
        data={editData}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default MaterialCategoryList;
