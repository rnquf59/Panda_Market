"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  inputClassName?: string;
}

export default function SearchBar({
  value,
  placeholder = "검색할 상품을 입력해주세요",
  onSearch,
  className = "",
  inputClassName = "",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleSearch = () => {
    const currentValue = inputRef.current?.value || "";
    onSearch(currentValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/icon/ic_search.png"
        alt="검색"
        width={24}
        height={24}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onKeyDown={handleKeyDown}
        className={`pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-lg font-normal text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClassName}`}
      />
    </div>
  );
}
