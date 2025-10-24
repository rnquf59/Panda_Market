import { useInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteScrollOptions<T> {
  queryKey: unknown[];
  queryFn: (params: { cursor?: number; limit: number }) => Promise<{
    list: T[];
    nextCursor?: number;
  }>;
  initialLimit?: number;
  limit?: number;
  staleTime?: number;
  gcTime?: number;
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: Error | null;
  refetch: () => void;
}

export function useInfiniteScroll<T>({
  queryKey,
  queryFn,
  initialLimit = 10,
  limit = 10,
  staleTime = 1000 * 60 * 5,
  gcTime = 1000 * 60 * 10,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      return queryFn({
        cursor: pageParam,
        limit: pageParam === undefined ? initialLimit : limit,
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (LastPage) => {
      if (LastPage.list.length < limit) {
        return undefined;
      }
      return LastPage.nextCursor;
    },

    staleTime,
    gcTime,
  });

  const data = query.data?.pages.flatMap((page) => page.list) ?? [];

  return {
    data,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    error: query.error,
    refetch: query.refetch,
  };
}
