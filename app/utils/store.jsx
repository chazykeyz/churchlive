import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  school: schoolReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
