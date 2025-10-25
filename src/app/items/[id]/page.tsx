"use client";

import { useParams } from "next/navigation";
import ProductInfo from "./_components/Productinfo";
import { useEffect, useState } from "react";
import { ProductDetailResponse } from "@/types/product";
import { productAPI } from "@/api/products";
import Button from "@/components/ui/Button";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await productAPI.getProductDetail(productId);
        setProduct(productData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "상품을 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">상품 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="text-lg text-red-600">{error}</div>
        <Button
          variant="primary"
          size="small-40"
          onClick={() => window.location.reload()}
        >
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
    </div>
  );
}
