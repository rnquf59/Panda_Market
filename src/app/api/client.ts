import axios from "axios";

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
