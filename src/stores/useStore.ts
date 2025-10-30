import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";

interface AppState {
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    isLoggedIn: boolean;
  };

  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };

  ui: {
    isLoading: boolean;
  };

  // 검색 및 정렬 상태
  searchQuery: string;
  sortBy: "recent" | "favorite";

  setUser: (user: Partial<AppState["user"]>) => void;
  setTokens: (tokens: AppState["tokens"]) => void;
  login: (
    user: { id: string; name: string; email: string },
    tokens: { accessToken: string; refreshToken: string }
  ) => void;
  logout: () => void;
  setLoading: (Loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortby: "recent" | "favorite") => void;
}

export const useStore = create<AppState>()(
  devtools(
    (set) => ({
      user: {
        id: null,
        name: null,
        email: null,
        isLoggedIn: false,
      },

      tokens: {
        accessToken: null,
        refreshToken: null,
      },

      ui: {
        isLoading: false,
      },

      searchQuery: "",
      sortBy: "recent",

      setUser: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData, isLoggedIn: true },
        })),

      setTokens: (tokens) => set(() => ({ tokens })),

      login: (userData, tokens) =>
        set(() => {
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);

          return {
            user: {
              ...userData,
              isLoggedIn: true,
            },
            tokens,
          };
        }),

      logout: () =>
        set(() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          Cookies.remove("accessToken", { path: "/" });

          return {
            user: {
              id: null,
              name: null,
              email: null,
              isLoggedIn: false,
            },
            tokens: {
              accessToken: null,
              refreshToken: null,
            },
          };
        }),

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
