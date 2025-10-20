"use client";

import { productAPI } from "@/app/api/products";
import { ProductCard } from "@/types/product";
import { useStore } from "@/stores/useStore";
import { useEffect, useState } from "react";
import { transformProduct } from "@/utils/productUtils";

type ScreenSize = "mobile" | "tablet" | "pc";

export function useItemPage() {
  const [screenSize, setScreenSize] = useState<ScreenSize>("mobile");
  const [currentPage, setCurrentPage] = useState(1);
  const [bestProducts, setBestProducts] = useState<ProductCard[]>([]);
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  //   zustand 스토어 상태
  const { searchQuery, sortBy, setSearchQuery, setSortBy, setLoading, ui } =
    useStore();

  // 화면 크기 감지 및 상품 개수 계산
  const getBestProductCount = () => {
    if (typeof window === "undefined") return 1;

    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 768) return 2;

    return 1;
  };

  const getPageSize = () => {
    if (typeof window === "undefined") return 4;

    if (window.innerWidth >= 1280) return 10;
    if (window.innerWidth >= 768) return 6;

    return 4;
  };

  //   화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setScreenSize("pc");
      } else if (window.innerWidth >= 768) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 베스트 상품 로드
  useEffect(() => {
    const loadBestProducts = async () => {
      try {
        const bestCount = getBestProductCount();
        const response = await productAPI.getBestProducts(bestCount);
        setBestProducts(response.list.map(transformProduct));
      } catch (err) {
        console.error("베스트 상품 로드 실패:", err);
        setBestProducts([]);
      }
    };
    loadBestProducts();
  }, [screenSize]);

  // 상품 목록 로드
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        const pageSize = getPageSize();

        if (searchQuery.trim()) {
          response = await productAPI.searchProducts(searchQuery, {
            page: currentPage,
            pageSize,
            orderBy: sortBy,
          });
        } else {
          response = await productAPI.getProducts({
            page: currentPage,
            pageSize,
            orderBy: sortBy,
          });
        }

        const transformedProducts = response.list.map(transformProduct);
        setProducts(transformedProducts);
        setTotalPages(Math.ceil(response.totalCount / pageSize));
      } catch (err) {
        console.error("상품 목록 로드 실패:", err);
        setError("상품을 불러오는데 실패했습니다.");
        setProducts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage, searchQuery, sortBy, screenSize, setLoading]);

  const handleSortChange = (sort: "recent" | "favorite") => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    bestProducts,
    products,
    totalPages,
    error,
    searchQuery,
    sortBy,
    isLoading: ui.isLoading,

    setSearchQuery,
    handleSortChange,
    handlePageChange,
  };
}
