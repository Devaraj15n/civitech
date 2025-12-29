import { useEffect, useState } from "react";
import MasterList from "../../../components/master/MasterList";
import CostCodeForm from "./CostCodeForm";

// MOCK COST CODE DATA
const mockData = [
    {
        id: 1,
        cost_code: "MAT-001",
        name: "Cement",
        parent_cost_code_id: null,
        cost_component: "Material",
        description: "",
        status: 1
    },
    {
        id: 2,
        cost_code: "MAT-001-01",
        name: "OPC 53 Grade",
        parent_cost_code_id: 1,
        cost_component: "Material",
        description: "",
        status: 1
    },
    {
        id: 3,
        cost_code: "LAB-001",
        name: "Masonry Labour",
        parent_cost_code_id: null,
        cost_component: "Labour",
        description: "",
        status: 1
    }
];

const CostCodeList = () => {
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
                title="Cost Code Master"
                rows={rows}
                loading={loading}
                columns={[
                    {
                        field: "cost_code",
                        headerName: "Cost Code",
                        width: 160
                    },
                    {
                        field: "name",
                        headerName: "Cost Name",
                        flex: 1
                    },
                    {
                        field: "parent_cost_code_id",
                        headerName: "Parent Cost Code",
                        flex: 1,
                        valueGetter: (params) => {
                            const row = params?.row;
                            if (!row || !row.parent_cost_code_id) return "-";

                            return (
                                rows.find((r) => r.id === row.parent_cost_code_id)
                                    ?.cost_code || "-"
                            );
                        }
                    },
                    {
                        field: "cost_component",
                        headerName: "Component",
                        width: 140
                    },
                    {
                        field: "status",
                        headerName: "Status",
                        width: 120,
                        renderCell: (params) =>
                            params?.row?.status === 1 ? "Active" : "Inactive"
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
