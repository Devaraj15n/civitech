import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/layouts/DashboardLayout";

// Library
import LibraryLayout from "../pages/library/LibraryLayout";
import MaterialCategoryList from "../pages/library/material-category/MaterialCategoryList";
import MaterialLibraryList from "../pages/library/material/MaterialLibraryList";
import PartyTypeList from "../pages/library/party-type/PartyTypeList";
import PartyLibraryList from "../pages/library/party/PartyLibraryList";
import CostCodeList from "../pages/library/cost-code/CostCodeList";
import RateMasterList from "../pages/library/rate/RateMasterList";
import WorkforceTypeList from "../pages/library/workforce-type/WorkforceTypeList";
import WorkforceList from "../pages/library/workforce/WorkforceList";
import AssetTypeList from "../pages/library/asset-type/AssetTypeList";
import DeductionList from "../pages/library/deduction/DeductionList";
import RetentionList from "../pages/library/retention/RetentionList";
import ProgressList from "../pages/library/progress/ProgressList";

export default function AppRoutes() {
  // const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/"
        element={<DashboardLayout />}
      >
        <Route path="dashboard" element={<Dashboard />} />

        {/* LIBRARY ROUTES */}
        <Route path="library" element={<LibraryLayout />}>
          {/* DEFAULT PAGE */}
          <Route index element={<Navigate to="party-types" replace />} />

          <Route path="party-types" element={<PartyTypeList />} />
          <Route path="material-categories" element={<MaterialCategoryList />} />
          <Route path="materials" element={<MaterialLibraryList />} />
          <Route path="parties" element={<PartyLibraryList />} />
          <Route path="cost-codes" element={<CostCodeList />} />
          <Route path="rates" element={<RateMasterList />} />
          <Route path="workforce-types" element={<WorkforceTypeList />} />
          <Route path="workforce" element={<WorkforceList />} />
          <Route path="asset-types" element={<AssetTypeList />} />
          <Route path="deductions" element={<DeductionList />} />
          <Route path="retentions" element={<RetentionList />} />
          <Route path="progress" element={<ProgressList />} />
        </Route>
      </Route>
    </Routes>
  );
}
