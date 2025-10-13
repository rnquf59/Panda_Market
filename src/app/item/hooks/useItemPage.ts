"use client";

import { ProductCard } from "@/app/types/product";
import { useStore } from "@/stores/useStore";
import { useEffect, useState } from "react";

type ScreenSize = "mobile" | "tablet" | "pc";

export function useItemPage() {
  const [screenSize, setScreenSize] = useState<ScreenSize>("mobile");
  const [currentPge, setCurrentPage] = useState(1);
  const [bestProducts, setBestProducts] = useState<ProductCard[]>([]);
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [totalPages, setTotalpages] = useState(0);

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
  return {};
}
