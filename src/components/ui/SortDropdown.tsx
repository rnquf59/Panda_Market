"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  options: SortOption[];
  onChange: (value: string) => void;
  variant?: "mobile" | "desktop";
  className?: string;
}

export default function SortDropdown({
  value,
  options,
  onChange,
  variant = "desktop",
  className = "",
}: SortDropdownProps) {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setShowOptions(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  if (variant === "mobile") {
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        ref={dropdownRef}
      >
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-[42px] h-[42px] border border-gray-200 rounded-xl bg-white flex items-center justify-center"
        >
          <Image
            src="/icon/ic_sort.png"
            alt="정렬"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>

        {showOptions && (
          <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
            {options.map((option, index) => (
              <div key={option.value}>
                {index > 0 && <div className="border-t border-gray-200"></div>}
                <button
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full px-3 py-2 text-center text-lg font-normal text-gray-800 hover:bg-gray-50 ${
                    index === 0 ? "rounded-t-xl" : ""
                  } ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center ${className}`}
      ref={dropdownRef}
    >
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="px-5 py-2 border border-gray-200 rounded-xl bg-white flex items-center justify-between gap-2"
      >
        <span className="text-lg font-normal text-gray-800">
          {selectedOption?.label || options[0]?.label}
        </span>
        <Image
          src="/icon/ic_arrow_down.png"
          alt="정렬"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </button>

      {showOptions && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          {options.map((option, index) => (
            <div key={option.value}>
              {index > 0 && <div className="border-t border-gray-200"></div>}
              <button
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-3 py-2 text-center text-lg font-normal text-gray-800 hover:bg-gray-50 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""}`}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
