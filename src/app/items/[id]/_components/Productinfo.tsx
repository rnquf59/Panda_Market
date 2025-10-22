"use client";

import { ProductDetailResponse } from "@/types/product";
import { useState } from "react";

interface ProductInfoProps {
  product: ProductDetailResponse;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isHeartLiked, setIsHeartLiked] = useState(product.isFavorite);
  const [favoriteCount, setFavoriteCount] = useState(product.favoriteCount);

  const handleHeartToggle = async () => {
    try {
      let updatedProduct: ProductDetailResponse;
    } catch {}
  };

  return <></>;
}
