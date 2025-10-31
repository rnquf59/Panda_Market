import axios from "axios";
import { apiClient } from "./client";

export const imageAPI = {
  uploadImage: async (file: File): Promise<{ url: string }> => {
    try {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("이미지 파일 크기는 최대 5MB입니다.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.post("images/uploade", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 413) {
          throw new Error("이미지 파일 크기가 너무 큽니다. (최대 5MB)");
        }
        throw new Error(
          `이미지 업로드 실패: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("이미지 업로드 중 오류가 발생했습니다.");
    }
  },
};
