import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-1 mt-10 xl:mt-11">
      {/* 이전버튼 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
      >
        <Image
          src={
            currentPage === 1
              ? "/icon/arrow_left_inactive.svg"
              : "/icon/arrow_left_active.svg"
          }
          alt="이전"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </button>

      {/* 페이지 번호들 */}
      {Array.from({ length: 5 }, (_, i) => {
        const pageNum =
          Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
        if (pageNum > totalPages) return null;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg font-semibold ${
              pageNum === currentPage
                ? "bg-[#2F80ED] text-gray-100"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
      >
        <Image
          src={
            currentPage === totalPages
              ? "/icon/arrow_right_inactive.svg"
              : "/icon/arrow_right_active.svg"
          }
          alt="다음"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </button>
    </div>
  );
}
