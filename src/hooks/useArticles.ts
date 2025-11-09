import { articleAPI } from "@/api/articles";
import { useQuery } from "@tanstack/react-query";

export const articleKeys = {
  all: ["articles"] as const,
  best: (count: number) => [...articleKeys.all, "best", count] as const,
};

export function useBestArticles(count: number = 3) {
  return useQuery({
    queryKey: articleKeys.best(count),
    queryFn: () => articleAPI.getBestArticles(count),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
