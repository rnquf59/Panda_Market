import { Product, ProductCard } from "@/types/product";

// 유효한 이미지 URL인지 확인
export const isValidImageUrl = (url: string) => {
  return (
    url &&
    !url.includes("example.com") &&
    !url.includes("placeholder") &&
    (url.startsWith("http") || url.startsWith("/"))
  );
};

// API 응답을 프론트엔드용으로 변환하는 유틸리티 함수
export const transformProduct = (product: Product): ProductCard => {
  const getValidImage = () => {
    if (product.images && product.images.length > 0) {
      const validImage = product.images.find(isValidImageUrl);
      if (validImage) return validImage;
    }
    return "/image/img_empty.png";
  };

  return {
    id: product.id,
    title: product.name,
    price: `${product.price.toLocaleString()}원`,
    likes: product.favoriteCount,
    image: getValidImage(),
    description: product.description,
    tags: product.tags,
    ownerNickname: product.ownerNickname,
    createdAt: product.createdAt,
  };
};
