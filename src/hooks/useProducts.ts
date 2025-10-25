import { productAPI } from "@/api/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const porductKeys = {
  all: ["products"] as const,
  detail: (id: number) => [...porductKeys.all, "detail", id] as const,
};

export function useProductDetail(productId: number) {
  return useQuery({
    queryKey: porductKeys.detail(productId),
    queryFn: () => productAPI.getProductDetail(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export function useAddProductFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) =>
      productAPI.removeProductFavorite(productId),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({
        queryKey: porductKeys.detail(productId),
      });
    },
  });
}
