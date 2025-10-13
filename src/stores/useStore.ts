import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AppState {
  ui: {
    isLoading: boolean;
  };

  // 검색 및 정렬 상태
  searchQuery: string;
  sortBy: "recent" | "favorite";

  //   액션들
  setLoading: (Loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortby: "recent" | "favorite") => void;
}

export const useStore = create<AppState>()(
  devtools(
    (set) => ({
      ui: {
        isLoading: false,
      },

      searchQuery: "",
      sortBy: "recent",

      // 액션들
      setLoading: (Loading) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: Loading },
        })),

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      setSortBy: (sortBy) =>
        set({
          sortBy,
        }),
    }),
    { name: "panda-market-store" }
  )
);
