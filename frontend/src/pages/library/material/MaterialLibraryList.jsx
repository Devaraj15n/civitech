import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MasterList from "../../../components/master/MasterList";
import MaterialLibraryForm from "./MaterialLibraryForm";
import {
  fetchMaterials,
  saveMaterial,
} from "../../../features/material/materialSlice";
import { fetchMaterialCategories } from "../../../features/materialCategory/materialCategorySlice";

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
      await dispatch(saveMaterial(data)).unwrap();
      setOpen(false); // ✅ close only if success
    } catch (err) {
      // ❌ duplicate / validation error comes here
      console.error(err);
      // show toast or alert here
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
