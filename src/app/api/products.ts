import axios from "axios";
import { ProductListResponse, SearchParams } from "../../types/product";
import { apiClient } from "./client";

export const productAPI = {
  getBestProducts: async (count: number = 1): Promise<ProductListResponse> => {
    try {
      const response = await apiClient.get(
        `/products?orderBy=favorite&pageSize=${count}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },

  gerProducts: async (params?: SearchParams): Promise<ProductListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.pageSize)
        queryParams.append("pageSize", params.pageSize.toString());
      if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

      const response = await apiClient.get(
        `/products?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },

  serchProducts: async (
    keyword: string,
    params?: SearchParams
  ): Promise<ProductListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("keyword", keyword);
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.pageSize)
        queryParams.append("pageSize", params.pageSize.toString());
      if (params?.orderBy) queryParams.append("orderBy", params.orderBy);

      const response = await apiClient.get(
        `/products?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },
};
