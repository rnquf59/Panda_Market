import Image from "next/image";
import React from "react";

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
}

export default function Tag({ children, onRemove }: TagProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-[5px] bg-gray-100 rounded-[26px]">
      <span className="text-lg font-regular text-gray-800">#{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="w-[22px] h-[24px] flex items-center justify-center"
        >
          <Image src="/icon/ic_X.svg" alt="태그 삭제" width={22} height={24} />
        </button>
      )}
    </div>
  );
}
