"useclient";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SearchAndFilterProps {
  searchQuery: string;
  sortBy: "recent" | "favorite";
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: "recent" | "favorite") => void;
}

export default function SearchAndFilter({
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
}: SearchAndFilterProps) {
  const [shwoSortOptions, setShowSortOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchQuery;
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const currentValue = inputRef.current?.value || "";
    onSearchChange(currentValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (sort: "recent" | "favorite") => {
    onSortChange(sort);
    setShowSortOptions(false);
  };

  return (
    <>
      {/* 모바일 레이아웃 */}
      <div className="md:hidden mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-900">전체상품</h2>
          <Button variant="primary" size="small-40">
            상품 등록하기
          </Button>
        </div>
        <div className="flex gap-3.5">
          {/* 검색창 */}
          <div className="relative flex-1">
            <Image
              src="/icon/ic_search.svg"
              alt="검색"
              width={24}
              height={24}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              defaultValue={searchQuery}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-lg font-normal text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 정렬 케밥 버튼 - 모바일 */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => setShowSortOptions(!shwoSortOptions)}
              className="w-[42px] h-[42px] border border-gray-200 rounded-xl bg-white flex items-center justify-center"
            >
              <Image
                src="/icon/ic_sort.svg"
                alt="정렬"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </button>

            {shwoSortOptions && (
              <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10 ">
                <button
                  onClick={() => handleSortChange("recent")}
                  className="w-full px-3 py-2 text-center text-lg font-normal text-gray-800 rounded-t-xl hover:bg-gray-50"
                >
                  최신순
                </button>
                <div className="border-t border-gray200"></div>
                <button
                  onClick={() => handleSortChange("favorite")}
                  className="w-full px-3 py-2 text-center text-lg font-normal text-gray-800 rounded-t-xl hover:bg-gray-50"
                >
                  좋아요순
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 테이블/PC 레이아웃 */}
      <div className="hidden md:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">전체 상품</h2>
        <div className="flex gap-3.5">
          {/* 검색창 */}
          <div className="relative">
            <Image
              src="/icon/ic_search.svg"
              alt="검색"
              width={24}
              height={24}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
              onClick={handleSearch}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="검색할 상품을 입력해주세요"
              defaultValue={searchQuery}
              onKeyDown={handleKeyDown}
              className="w-80 pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-lg font-normal text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/*상품 등록하기 버튼 */}
          <Button variant="primary" size="small-40">
            상품 등록하기
          </Button>

          {/* 정렬 케밥 버튼 - 테블릿/PC */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowSortOptions(!shwoSortOptions)}
              className="px-5 py-2 border border-gray-200 rounded-xl bg-white flex items-center justify-between gap-2"
            >
              <span>{sortBy === "recent" ? "최신순" : "좋아요순"}</span>
              <Image
                src="/icon/ic_arrow_down.svg"
                alt="정렬"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </button>

            {shwoSortOptions && (
              <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <button
                  onClick={() => handleSortChange("recent")}
                  className="w-full px-3 py-2 text-center text-lg font-normal text-gray-800 rounded-t-xl hover:bg-gray-50"
                >
                  최신순
                </button>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={() => handleSortChange("favorite")}
                  className="w-full px-3 py-2 text-center text-lg font-normal text-gray-800 rounded-t-xl hover:bg-gray-50"
                >
                  좋아요순
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
