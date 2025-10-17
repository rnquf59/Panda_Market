"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Image from "next/image";
import React, { useRef, useState } from "react";
import TagInput from "./_components/TagInput";
import { CreateProductRequest } from "@/types/product";
import { productAPI } from "../api/products";

export default function AddItemPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageLimitError, setImageLimitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (selectedImage) {
      setImageLimitError("*이미지 등록은 최대 1개까지 가능합니다.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setImageLimitError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImageLimitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.description.trim() &&
      formData.price.trim() &&
      tags.length > 0
    );
  };

  const hnadleSumbit = async () => {
    if (!isFormValid()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const productData: CreateProductRequest = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price.replace(/[^0-9]/g, "")),
        images: [selectedImage!],
        tags: tags.map((tag) => tag.replace("#", "")),
      };

      const response = await productAPI.createProduct(productData);
      console.log("상품 등록 성공:", response);

      setFormData({ name: "", description: "", price: "" });
      setTags([]);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("상품 등록 실패:", err);
      setError(
        err instanceof Error ? err.message : "상품 등록에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 제목과 등록 버튼 */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">상품 등록하기</h1>
        <Button
          variant="primary"
          size="small-40"
          disabled={!isFormValid || isLoading}
          onClick={hnadleSumbit}
        >
          {isLoading ? "등록 중..." : "등록"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* 상품 이미지 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">상품 이미지</h2>
        <div className="flex gap-6">
          {/* 이미지 등록 영역 */}
          <div
            className="w-[168px] h-[168px] lg:w-[282px] lg:h-[282px] rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
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
                onClick={handleImageRemove}
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
          onChange={handleImageChange}
          className="hidden"
        />

        {/* 이미지 등록 제한 에러 메시지 */}
        {imageLimitError && (
          <p className="text-lg font-regular text-error mt-4">
            {imageLimitError}
          </p>
        )}
      </div>

      {/* 상품 명 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">상품명</h2>
        <Input
          type="text"
          placeholder="상품명을 입력해주세요"
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      {/* 상품 소개 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">상품 소개</h2>
        <Textarea
          placeholder="상품 소개를 입력해주세요"
          className="h-[282px]"
          value={formData.description}
          onChange={handleInputChange("description")}
        />
      </div>

      {/* 판매가격 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">판매 가격</h2>
        <Input
          type="text"
          placeholder="판매 가격을 입력해주세요"
          value={formData.price}
          onChange={handleInputChange("price")}
        />
      </div>

      {/* 태그 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">태그</h2>
        <TagInput
          tags={tags}
          onTagsChange={setTags}
          placeholder="태그를 입력해주세요"
        />
      </div>
    </div>
  );
}
