import { useRef, useState } from "react";
import { CreateProductRequest } from "@/types/product";
import { productAPI } from "@/api/products";

export function useAddItem() {
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
        setImageLimitError(null); // 이미지 등록 시 에러 메시지 제거
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImageLimitError(null); // 이미지 제거 시 에러 메시지 제거
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

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.price.trim() !== "" &&
      tags.length > 0
    );
  };

  const handleSubmit = async () => {
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
        images: [selectedImage!], // 이미지 URL로 변환 필요 (실제 구현에서는 파일 업로드 API 호출)
        tags: tags.map((tag) => tag.replace("#", "")), // # 제거
      };

      const response = await productAPI.createProduct(productData);
      console.log("상품 등록 성공:", response);

      // 성공 시 폼 초기화 또는 페이지 이동
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

  return {
    // 상태
    selectedImage,
    tags,
    formData,
    isLoading,
    error,
    imageLimitError,
    fileInputRef,

    // 핸들러
    handleImageClick,
    handleImageChange,
    handleImageRemove,
    handleInputChange,
    handleSubmit,
    setTags,

    // 유틸리티
    isFormValid: isFormValid(),
  };
}
