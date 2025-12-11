import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Refresh instance (no interceptors)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_REFRESH_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Refresh Token function
const refreshToken = async () => {
  try {
    const res = await refreshClient.post("/auth/refresh");
    console.log("Token refreshed");
    return res.data;
  } catch (error) {
    console.error("Refresh failed");
    throw error;
  }
};

// Interceptor: auto-refresh on 401
api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh → logout required");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;