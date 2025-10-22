import { CommentListParams, CommentListResponse } from "@/types/product";
import { apiClient } from "./client";
import axios from "axios";

export const commentAPI = {
  getProductComments: async (
    params: CommentListParams
  ): Promise<CommentListResponse> => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("limit", params.limit.toString());
      if (params.cursor !== undefined) {
        queryParams.append("cursor", params.cursor.toString());
      }

      const response = await apiClient.get(
        `/products/${params.productId}/comments?${queryParams.toString()}`
      );
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
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },

  createProductComment: async (
    productId: number,
    content: string
  ): Promise<Comment> => {
    try {
      const response = await apiClient.post(`/products/${productId}/comments`, {
        content,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("상품을 찾을 수 없습니다.");
        }
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },

  updateComment: async (
    commentId: number,
    content: string
  ): Promise<Comment> => {
    try {
      const response = await apiClient.patch(`/comments/${commentId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error("댓글을 수정할 권한이 없습니다.");
        }
        if (error.response?.status === 404) {
          throw new Error("댓글을 찾을 수 없습니다.");
        }
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },

  deleteComment: async (commentId: number): Promise<{ id: number }> => {
    try {
      const response = await apiClient.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error("댓글을 삭제할 권한이 없습니다.");
        }
        if (error.response?.status === 404) {
          throw new Error("댓글을 찾을 수 없습니다.");
        }
        throw new Error(
          `API Error: ${error.response?.status} ${error.message}`
        );
      }
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  },
};
