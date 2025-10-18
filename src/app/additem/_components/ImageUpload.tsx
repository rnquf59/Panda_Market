import Image from "next/image";
import React, { useRef } from "react";

interface ImageUploadProps {
  selectedImage: string | null;
  imageLimitError: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageClick: () => void;
  onImageRemove: () => void;
}

export default function ImageUpload({
  selectedImage,
  imageLimitError,
  onImageChange,
  onImageClick,
  onImageRemove,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2 className="text-2lg font-bold text-gray-800 mb-4">상품 이미지</h2>
      <div className="flex gap-6">
        {/* 이미지 등록 영역 */}
        <div
          className="w-[168px] h-[168px] lg:w-[282px] lg:h-[282px] rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer"
          onClick={onImageClick}
        >
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/icon/ic_plus.svg"
              alt="이미지 추가"
              width={48}
              height={48}
            />
            <span className="text-lg font-regular text-gray-400">
              이미지 등록
            </span>
          </div>
        </div>

        {/* 등록된 이미지 미리보기 */}
        {selectedImage && (
          <div className="w-[168px] h-[168px] lg:w-[282px] lg:h-[282px] rounded-xl flex items-center justify-center relative">
            <Image
              src={selectedImage}
              alt="등록된 이미지"
              width={282}
              height={282}
              className="w-full h-full object-cover rounded-xl"
            />
            <button
              onClick={onImageRemove}
              className="absolute top-3 right-3 w-[22px] h-[24px] flex items-center justify-center"
            >
              <Image
                src="/icon/ic_X.svg"
                alt="이미지 삭제"
                width={22}
                height={24}
              />
            </button>
          </div>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />

      {/* 이미지 등록 제한 에러 메시지 */}
      {imageLimitError && (
        <p className="text-lg font-regular text-error mt-4">
          {imageLimitError}
        </p>
      )}
    </div>
  );
}
