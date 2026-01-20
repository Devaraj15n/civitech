import { Navigate } from "react-router-dom";
import ProjectDetails from "./index/ProjectDetails";

import ProjectOverview from "./overview/ProjectOverview";
import BoqList from "./boq/ProjectBOQ";
import TaskList from "./task/index/ProjectTasks";
import ProgressTracking from "./progress/ProjectProgress";
import MaterialTransactions from "./material/ProjectMaterials";

/* 🔹 TRANSACTION */
import TransactionLayout from "./transaction/transaction_tab/TransactionLayout";
import TransactionsPage from "./transaction/TransactionPage";
import PaymentRequestsPage from "./transaction/payment_tab/PaymentRequestsPage";

export default {
  path: "projects/:id",
  element: <ProjectDetails />,
  children: [
    { index: true, element: <Navigate to="overview" replace /> },
    { path: "overview", element: <ProjectOverview /> },
    { path: "boq", element: <BoqList /> },
    { path: "tasks", element: <TaskList /> },
    { path: "progress", element: <ProgressTracking /> },
    { path: "materials", element: <MaterialTransactions /> },
    /* 🔥 TRANSACTIONS */
    {
      path: "transactions",
      element: <TransactionLayout />,
      children: [
        { index: true, element: <Navigate to="list" replace /> },
        { path: "list", element: <TransactionsPage /> },
        { path: "payment-requests", element: <PaymentRequestsPage /> }
      ]
    }
  ],
};
