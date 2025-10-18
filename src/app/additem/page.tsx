"use client";

import Image from "next/image";
import { useAddItem } from "./hooks/useAdditem";
import AddItemHeader from "./_components/AddItemHeader";
import ErrorMessage from "./_components/ErrorMessage";
import ImageUpload from "./_components/ImageUpload";
import ProductFormField from "./_components/ProductFormField";
import TagInput from "./_components/TagInput";

export default function AddItemPage() {
  const {
    selectedImage,
    tags,
    formData,
    isLoading,
    error,
    imageLimitError,
    handleImageClick,
    handleImageChange,
    handleImageRemove,
    handleInputChange,
    handleSubmit,
    setTags,
    isFormValid,
  } = useAddItem();
  return (
    <div className="flex flex-col gap-6">
      <AddItemHeader
        isFormValid={isFormValid}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />

      <ErrorMessage error={error} />

      <ImageUpload
        selectedImage={selectedImage}
        imageLimitError={imageLimitError}
        onImageChange={handleImageChange}
        onImageClick={handleImageClick}
        onImageRemove={handleImageRemove}
      />
      <ProductFormField
        title="상품명"
        type="text"
        placeholder="상품명을 입력해주세요"
        value={formData.name}
        onChange={handleInputChange("name")}
      />

      {/* 4. 상품 소개 */}
      <ProductFormField
        title="상품 소개"
        type="textarea"
        placeholder="상품 소개를 입력해주세요"
        value={formData.description}
        onChange={handleInputChange("description")}
      />

      {/* 5. 판매가격 */}
      <ProductFormField
        title="판매가격"
        type="text"
        placeholder="판매 가격을 입력해주세요"
        value={formData.price}
        onChange={handleInputChange("price")}
      />

      {/* 6. 태그 */}
      <TagInput
        tags={tags}
        onTagsChange={setTags}
        placeholder="태그를 입력해주세요"
      />
    </div>
  );
}
