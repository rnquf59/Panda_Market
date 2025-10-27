import { email } from "zod";
import { SignupFormData } from "../schemas/authSchema";
import { apiClient } from "./client";

export const authAPI = {
  signup: async (data: SignupFormData) => {
    try {
      const response = await apiClient.post("/auth/signUp", {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        passwordConfirmation: data.confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post("/auth/signIn", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await apiClient.post("/auth/refresh-token", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
