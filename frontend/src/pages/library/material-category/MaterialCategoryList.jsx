import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import MaterialCategoryForm from "./MaterialCategoryForm";

// TEMP API MOCK (replace with real API)
const mockData = [
    { id: 1, category_name: "ASIAN PAINTS", description: "", status: 1 },
    { id: 2, category_name: "CONSTRUCTION MATERIALS", description: "", status: 1 }
];

const MaterialCategoryList = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // API CALL HERE
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
                { ...data, id: Date.now() }
            ]);
        }
    };

    return (
        <>
            <MasterList
                title="Material Category Master"
                columns={[
                    { field: "category_name", headerName: "Category Name", flex: 1 },
                    { field: "description", headerName: "Description", flex: 1 },
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
