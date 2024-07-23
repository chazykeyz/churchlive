import jwtDecode from "jwt-decode";
import axios from "axios";
import { MAIN_END_POINT, REFRESH_TOKEN } from "./constants";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";

const baseURL = MAIN_END_POINT;

const getAccessToken = async () => {
  return await SecureStore.getItemAsync("accessToken");
};

const getRefreshToken = async () => {
  return await SecureStore.getItemAsync("refreshToken");
};

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response === undefined) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === REFRESH_TOKEN
    ) {
      await SecureStore.clear();
      //   myLocation("/accounts/login");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.data.code === "token_not_valid"
    ) {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      if (accessToken && refreshToken) {
        const decodedToken = jwtDecode(accessToken);
        const isExpired =
          dayjs.unix(decodedToken.exp).diff(dayjs(), "minute") < 1;

        if (isExpired) {
          try {
            const { data } = await axios.post(`${baseURL}${REFRESH_TOKEN}`, {
              refresh: refreshToken,
            });

            await SecureStore.setItemAsync("accessToken", data.accessToken);
            await SecureStore.setItemAsync("refreshToken", data.refreshToken);

            axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            return axiosInstance(originalRequest);
          } catch (error) {
            await SecureStore.clear();
            //   myLocation("/accounts/login");
            return Promise.reject(error);
          }
        } else {
          await SecureStore.clear();
          //   myLocation("/accounts/login");
          return Promise.reject(error);
        }
      } else {
        await SecureStore.clear();
        //   myLocation("/accounts/login");
        return Promise.reject(error);
      }
    } else if (
      error.response.status === 401 &&
      error.response.data.code === "user_inactive"
    ) {
      await SecureStore.clear();
      //   myLocation("/accounts/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
