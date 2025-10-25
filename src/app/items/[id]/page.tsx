"use client";

import { useParams } from "next/navigation";
import ProductInfo from "./_components/Productinfo";
import Button from "@/components/ui/Button";
import { useProductDetail } from "@/hooks/useProducts";
import InquirySection from "./_components/InquirySection";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useProductDetail(productId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">상품 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="text-lg text-red-600">
          {error instanceof Error
            ? error.message
            : "상품을 불러오는데 실패했습니다."}
        </div>
        <Button variant="primary" size="small-40" onClick={() => refetch()}>
          다시 시도
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">상품을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ProductInfo product={product} />

      <InquirySection productId={productId} />
    </div>
  );
}
