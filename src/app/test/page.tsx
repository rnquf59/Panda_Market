"use client";

import ItemNavbar from "@/components/layout/Navbar";
import ProductCard from "../item/components/ProductCard";
import ProductList from "../item/components/ProductList";
import Pagination from "../item/components/Pagination";
import SearchAndFilter from "../item/components/SearchAndFilter";
import { useState } from "react";

export default function TestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "favorite">("recent");

  const mockProducts = [
    {
      id: 1,
      title: "아이폰 15 Pro",
      price: "₩1,500,000",
      likes: 25,
      image: "/items/img_empty.png",
    },
    {
      id: 2,
      title: "맥북 프로 16인치",
      price: "₩3,200,000",
      likes: 42,
      image: "/items/img_empty.png",
    },
    {
      id: 3,
      title: "에어팟 프로 2세대",
      price: "₩350,000",
      likes: 18,
      image: "/items/img_empty.png",
    },
    {
      id: 4,
      title: "애플워치 시리즈 9",
      price: "₩599,000",
      likes: 33,
      image: "/items/img_empty.png",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <ItemNavbar />
      <main className="px-[15px] pt-[17px] pb-[35px] md:px-6 xl:px-0 xl:max-w-[1200px]">
        {/* SearchAndFilter 테스트 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            SearchAndFilter 테스트
          </h2>
          <SearchAndFilter
            searchQuery={searchQuery}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
          />
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>검색어:</strong> {searchQuery || "없음"}
              <br />
              <strong>정렬:</strong>{" "}
              {sortBy === "recent" ? "최신순" : "좋아요순"}
            </p>
          </div>
        </div>

        <section className="mb-6 md:mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">베스트 상품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap6">
            <ProductCard product={mockProducts[0]} />
          </div>
        </section>
        <div className="mb-12">
          <h3 className="text-md font-medium mb-4">ProductList 정상상태</h3>
          <ProductList products={mockProducts} isLoading={false} error={null} />

          <div className="mt-8">
            <h3 className="text-md font-medium mb-4">페이지네이션 테스트</h3>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
