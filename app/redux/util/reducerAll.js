import { createSlice } from "@reduxjs/toolkit";

const myReduxReducer = (sliceName, initialState, singleAction, actionList) => {
  return createSlice({
    name: sliceName,
    initialState,
    extraReducers: (builder) => {
      if (actionList) {
        for (const actionObj of actionList) {
          Object.keys(actionObj).forEach((actionKey) => {
            const actionCreator = actionObj[actionKey];
            builder
              .addCase(actionCreator.pending, (state, action) => {
                if (action.meta.arg.loadingOff) {
                  state.loading = false;
                } else {
                  state.loading = true;
                }
              })
              .addCase(actionCreator.fulfilled, (state, action) => {
                if (action.payload?.errors) {
                  state.errors = action?.payload?.errors;
                  state.loading = false;
                } else {
                  state[action.meta.arg.updatedKey] = action?.payload?.data;
                  state.loading = false;
                }
              })
              .addCase(actionCreator.rejected, (state, action) => {
                state.loading = false;
                state.errors = action?.payload?.errors;
              });
          });
        }
      } else {
        Object.keys(singleAction).forEach((actionKey) => {
          const actionCreator = singleAction[actionKey];
          builder
            .addCase(actionCreator.pending, (state, action) => {
              if (action.meta.arg.loadingOff) {
                state.loading = false;
              } else {
                state.loading = true;
              }
            })
            .addCase(actionCreator.fulfilled, (state, action) => {
              if (action.payload?.errors) {
                state.errors = action?.payload?.errors;
                state.loading = false;
              } else {
                state[action.meta.arg.updatedKey] = action?.payload?.data;
                state.loading = false;
              }
            })
            .addCase(actionCreator.rejected, (state, action) => {
              state.loading = false;
              state.errors = action?.payload?.errors;
            });
        });
      }
    },
  });
};

export default myReduxReducer;
