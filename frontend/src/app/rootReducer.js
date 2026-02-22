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
import progressMessageReducer from "../features/projects/progress/progressMessageSlice";
import projectTrackingFileReducer from "../features/projects/progress/progressTrackingFilesSlice";
import progressTimelineReducer from "../features/projects/progress/progressTimelineSlice";
import subTaskProgressTimelineReducer from "../features/projects/progress/subTaskProgressTimelineSlice";


import projectPartyReducer from "../features/projects/project_party/projectPartySlice";




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
  progress: progressReducer,
  progressMessage: progressMessageReducer,
  progressTrackingFiles: projectTrackingFileReducer,
  progressTimeline: progressTimelineReducer,
  subTaskProgressTimeline: subTaskProgressTimelineReducer,
  projectParties: projectPartyReducer,


  // Dashboard
  dashboard: dashboardReducer

};

export default rootReducer;
