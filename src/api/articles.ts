import { ArticleListResponse, ArticleSearchParams } from "@/types/article";
import { apiClient } from "./client";
import axios from "axios";

export const articleAPI = {
  getArticles: async (
    params?: ArticleSearchParams
  ): Promise<ArticleListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.pageSize)
        queryParams.append("pageSize", params.pageSize.toString());
      if (params?.orderBy) queryParams.append("orderBy", params.orderBy);
      if (params?.keyword) queryParams.append("orderBy", params.keyword);

      const response = await apiClient.get(
        `/article?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error:${error.response?.status} ${error.message}`);
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },
};
