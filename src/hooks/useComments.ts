import { commentAPI } from "@/api/comments";
import { CommentListParams } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (params: CommentListParams) =>
    [...commentKeys.lists(), params] as const,
};

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      content,
    }: {
      productId: number;
      content: string;
    }) => commentAPI.createProductComment(productId, content),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", productId],
      });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => commentAPI.updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentAPI.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
}
