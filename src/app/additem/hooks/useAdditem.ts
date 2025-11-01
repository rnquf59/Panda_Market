import { useRef, useState } from "react";
import { CreateProductRequest } from "@/types/product";
import { productAPI } from "@/api/products";
import { imagesAPI } from "@/api/images";

export function useAddItem() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
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
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        setImageLimitError("*이미지 파일 크기는 최대 5MB입니다.");
        return;
      }

      setSelectedImageFile(file);
      setImageLimitError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setSelectedImageFile(null);
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

    if (!selectedImageFile) {
      setError("이미지를 등록해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const uploadeResponse = await imagesAPI.uploadImage(selectedImageFile);
      const imageUrl = uploadeResponse.url;

      const productData: CreateProductRequest = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price.replace(/[^0-9]/g, "")),
        images: [imageUrl!],
        tags: tags.map((tag) => tag.replace("#", "")),
      };

      const response = await productAPI.createProduct(productData);
      console.log("상품 등록 성공:", response);

      setFormData({ name: "", description: "", price: "" });
      setTags([]);
      setSelectedImage(null);
      setSelectedImageFile(null);
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
    selectedImage,
    tags,
    formData,
    isLoading,
    error,
    imageLimitError,
    fileInputRef,

    handleImageClick,
    handleImageChange,
    handleImageRemove,
    handleInputChange,
    handleSubmit,
    setTags,

    isFormValid: isFormValid(),
  };
}
