import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/project/projectSlice";
// import materialReducer from "../features/material/materialSlice";

const rootReducer = {
  auth: authReducer,
  project: projectReducer,
  // material: materialReducer
};

export default rootReducer;
