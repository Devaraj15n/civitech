import authReducer from "../features/auth/authSlice";
import materialReducer from "../features/masters/material/materialSlice";
import materialCategoryReducer from "../features/masters/materialCategory/materialCategorySlice";
import partyTypeReducer from "../features/masters/partyType/partyTypeSlice";
import partyReducer from "../features/masters/party/partySlice";
import costCodeReducer from "../features/masters/costCode/costCodeSlice";
import rateReducer from "../features/masters/rate/rateSlice";
import workforceTypeReducer from "../features/masters/workforceType/workforceTypeSlice";


//project
import projectReducer from "../features/projects/projectSlice";
import projectTaskReducer from "../features/projects/tasks/taskSlice";
import subTaskReducer from "../features/projects/subtasks/subTaskSlice";
import progressReducer from "../features/projects/progress/progressSlice";



//dashboard
import dashboardReducer from '../features/dashboard/dashboardSlice'

const rootReducer = {
  auth: authReducer,
  material: materialReducer,
  materialCategory: materialCategoryReducer,
  partyType: partyTypeReducer,
  party: partyReducer,
  costCode: costCodeReducer,
  rate: rateReducer,
  workforceType: workforceTypeReducer,

  // Project
  project: projectReducer,
  projectTask:projectTaskReducer,
  projectSubTask: subTaskReducer,
  progress: progressReducer, // ✅ add it here

  // Dashboard
  dashboard: dashboardReducer

};

export default rootReducer;
