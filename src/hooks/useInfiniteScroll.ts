import { useState, useCallback } from "react";

interface UseInfiniteScrollOptions<T, P = Record<string, unknown>> {
  fetchFunction: (params: P) => Promise<{
    list: T[];
    nextCursor?: number;
  }>;
  initialParams: P;
  limit?: number;
  loadingDelay?: number; // 로딩 시간 (ms)
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  reset: () => void;
  loadInitialData: () => Promise<void>;
}

export function useInfiniteScroll<T, P = Record<string, unknown>>({
  fetchFunction,
  initialParams,
  limit = 10,
  loadingDelay = 0,
}: UseInfiniteScrollOptions<T, P>): UseInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadInitialData = useCallback(async () => {
    if (isInitialized) return;

    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction({
        ...initialParams,
        limit,
      });

      setData(result.list);
      setHasMore(result.list.length === limit);
      setNextCursor(result.nextCursor);
      setIsInitialized(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다."
      );
      setData([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialParams, limit, isInitialized]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor || !isInitialized) return;

    try {
      setLoading(true);
      setError(null);

      if (loadingDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, loadingDelay));
      }

      const result = await fetchFunction({
        ...initialParams,
        limit,
        cursor: nextCursor,
      });

      setData((prev) => [...prev, ...result.list]);
      setHasMore(result.list.length === limit);
      setNextCursor(result.nextCursor);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "추가 데이터를 불러오는데 실패했습니다."
      );
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [
    fetchFunction,
    initialParams,
    limit,
    loading,
    hasMore,
    nextCursor,
    isInitialized,
    loadingDelay,
  ]);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const result = await fetchFunction({
        ...initialParams,
        limit,
      });

      setData(result.list);
      setHasMore(result.list.length === limit);
      setNextCursor(result.nextCursor);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "데이터 새로고침에 실패했습니다."
      );
    }
  }, [fetchFunction, initialParams, limit]);

  const reset = useCallback(() => {
    setData([]);
    setLoading(false);
    setHasMore(true);
    setError(null);
    setNextCursor(undefined);
    setIsInitialized(false);
  }, []);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    refresh,
    reset,
    loadInitialData,
  };
}
