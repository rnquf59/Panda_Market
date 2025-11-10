"useclient";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import SortDropdown from "@/components/ui/SortDropdown";

interface SearchAndFilterProps {
  searchQuery: string;
  sortBy: "recent" | "favorite";
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: "recent" | "favorite") => void;
}

const sortOptions = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

export default function SearchAndFilter({
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
}: SearchAndFilterProps) {
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
          <SearchBar
            value={searchQuery}
            onSearch={onSearchChange}
            className="flex-1"
            inputClassName="w-full"
          />
          <SortDropdown
            value={sortBy}
            options={sortOptions}
            onChange={(value) => onSortChange(value as "recent" | "favorite")}
            variant="mobile"
          />
        </div>
      </div>

      {/* 테이블/PC 레이아웃 */}
      <div className="hidden md:flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">전체 상품</h2>
        <div className="flex gap-3.5">
          <SearchBar
            value={searchQuery}
            onSearch={onSearchChange}
            inputClassName="w-80"
          />

          <Button variant="primary" size="small-40">
            상품 등록하기
          </Button>
          <SortDropdown
            value={sortBy}
            options={sortOptions}
            onChange={(value) => onSortChange(value as "recent" | "favorite")}
          />
        </div>
      </div>
    </>
  );
}
