import { notifyError, notifySucess } from "@/components/notifications";
import { successResponse } from "@/helpers";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import queryString from "query-string";

function buildQueryString(params) {
  return queryString.stringify(params, { skipNull: true });
}

export const myReduxActions = (url, name, link) => ({
  createItem: createAsyncThunk(`${link}/create`, async (payload) => {
    try {
      const data = await axiosInstance.post(`${url}`, payload);

      if (data.errors) {
        notifyError(`${name} failed to be created`);
      } else {
        notifySucess(`${name} created succesfull`);
      }
      return successResponse(data);
    } catch (error) {
      return successResponse(null, error?.response?.data);
    }
  }),

  getItems: createAsyncThunk(`${link}/get-all-items`, async ({ params }) => {
    const queryString = params ? `?${buildQueryString(params)}` : "";
    try {
      const data = await axiosInstance.get(`${url}${queryString}`);

      return successResponse(data);
    } catch (error) {
      return successResponse(null, error?.response?.data);
    }
  }),
  getItem: createAsyncThunk(`${link}/get-single-items`, async (payload) => {
    const queryString = payload.params
      ? `?${buildQueryString(payload.params)}`
      : "";
    try {
      if (payload.id) {
        const data = await axiosInstance.get(
          `${url}${payload.id}${queryString}`
        );
        return successResponse(data);
      } else {
        const data = await axiosInstance.get(`${url}${queryString}`);
        return successResponse(data);
      }
    } catch (error) {
      return successResponse(null, error?.response?.data);
    }
  }),
  updateItem: createAsyncThunk(`${link}/update-item`, async (payload) => {
    try {
      const { data } = await axiosInstance.patch(
        `${url}${payload.id}/`,
        payload.body
      );
      if (data.errors) {
        notifyError(`${name} failed to updated`);
      } else {
        notifySucess(`${name} updated succesfull`);
      }
      return successResponse(data);
    } catch (error) {
      notifyError(`${name} failed to be updated`);
      return successResponse(null, error?.response?.data);
    }
  }),

  deleteItem: createAsyncThunk(`${link}/delete-item`, async (id) => {
    try {
      await axiosInstance.delete(`${url}${id}/`);
      notifySucess(`${name} deleted succesfull`);
    } catch (error) {
      return successResponse(null, error?.response?.data);
    }
  }),
  deleteSelectedItems: createAsyncThunk(
    `${link}/delete-selelected-items`,
    async (payload) => {
      const { selectedItems } = payload;
      try {
        selectedItems.map(async (selectedItem) => {
          await axiosInstance.delete(`${url}/${selectedItem}/`);
        });

        notifySucess(`All ${name}s deleted succesfull`);
      } catch (error) {
        return successResponse(null, error?.response?.data);
      }
    }
  ),
  searchItem: createAsyncThunk(`${link}/search-items`, async (payload) => {
    const queryString = payload.params
      ? `?${buildQueryString(payload.params)}`
      : "";
    try {
      const data = await axiosInstance.get(
        `${url}${queryString}&search=${payload.query}`
      );

      return successResponse(data);
    } catch (error) {
      return successResponse(null, error?.response?.data);
    }
  }),
});
