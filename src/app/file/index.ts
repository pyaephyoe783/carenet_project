import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { authStore } from "@/store/auth-result.store";
import { refreshToken } from "../anonymous/client";

export function anonymousClient() {
    return axios.create({
        baseURL: 'http://localhost:8080/anonymous',
        timeout: 3000
    })
}

export function securedClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000,
  });

  // ✅ Correctly typed interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const { auth } = authStore.getState();

      // Ensure headers exist
      if (!config.headers) {
       config.headers = new Headers() as any;
      }

      if (auth?.accessToken) {
        config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
      }

      return config;
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { auth, setAuth } = authStore.getState();

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResult = await refreshToken(auth?.refreshToken || "");
          if (refreshResult) {
            setAuth(refreshResult);

            // retry last request
            originalRequest.headers["Authorization"] = `Bearer ${refreshResult.accessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
