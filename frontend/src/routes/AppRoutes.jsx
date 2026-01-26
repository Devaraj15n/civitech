import { Navigate, useRoutes } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/layouts/DashboardLayout";

// Projects
import ProjectList from "../pages/project/index/ProjectList";
import ProjectAdd from "../pages/project/index/ProjectAdd";
import projectRoutes from "../pages/project/routes";

// Library
import LibraryLayout from "../pages/library/LibraryLayout";
import MaterialCategoryList from "../pages/library/material-category/MaterialCategoryList";
import MaterialLibraryList from "../pages/library/material/MaterialLibraryList";
import PartyTypeList from "../pages/library/party-type/PartyTypeList";
import PartyLibraryList from "../pages/library/party/PartyLibraryList";
import CostCodeList from "../pages/library/cost-code/CostCodeList";
import RateMasterList from "../pages/library/rate/RateMasterList";
import WorkforceTypeList from "../pages/library/workforce-type/WorkforceTypeList";



//party 
import PartyList from "../pages/party_and_finance/party/PartyList"

// Auth Guard
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "party-finance", element: <PartyList /> },

        // PROJECT LIST + ADD
        {
          path: "projects",
          children: [
            { index: true, element: <ProjectList /> },
            { path: "add", element: <ProjectAdd /> },
          ],
        },

        // 🔥 PROJECT DETAILS (MODULE ROUTE)
        projectRoutes,

        // LIBRARY
        {
          path: "library",
          element: <LibraryLayout />,
          children: [
            { index: true, element: <Navigate to="party-types" replace /> },
            { path: "party-types", element: <PartyTypeList /> },
            { path: "material-categories", element: <MaterialCategoryList /> },
            { path: "materials", element: <MaterialLibraryList /> },
            { path: "parties", element: <PartyLibraryList /> },
            { path: "cost-codes", element: <CostCodeList /> },
            { path: "rates", element: <RateMasterList /> },
            { path: "workforce-types", element: <WorkforceTypeList /> },
          ],
        },
      ],
    },
  ]);

  return routes;
}
