import axios from "axios";
import {
  CreateProductRequest,
  CreateProductResponse,
  ProductDetailResponse,
  ProductListResponse,
  SearchParams,
} from "../types/product";
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

  getProducts: async (params?: SearchParams): Promise<ProductListResponse> => {
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

  searchProducts: async (
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

  createProduct: async (
    productData: CreateProductRequest
  ): Promise<CreateProductResponse> => {
    try {
      const response = await apiClient.post("/products", productData);
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

  getProductDetail: async (
    productId: number
  ): Promise<ProductDetailResponse> => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("상품을 찾을 수 없습니다");
        }
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다");
    }
  },
};
