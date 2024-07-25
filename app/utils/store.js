import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/redux/auth/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
