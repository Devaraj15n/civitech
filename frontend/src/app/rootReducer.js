import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/project/projectSlice";
import materialReducer from "../features/material/materialSlice";
import materialCategoryReducer from "../features/materialCategory/materialCategorySlice";

const rootReducer = {
  auth: authReducer,
  project: projectReducer,
  material: materialReducer,
  materialCategory: materialCategoryReducer
  // material: materialReducer
};

export default rootReducer;
