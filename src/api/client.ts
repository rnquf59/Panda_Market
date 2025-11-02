import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://panda-market-api.vercel.app";

//  axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Beare ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove("accessToken", { path: "/" });
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
