"use client";

import { productAPI } from "@/api/products";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { useAddProductFavorite } from "@/hooks/useProducts";
import { ProductDetailResponse } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: ProductDetailResponse;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const addFavoriteMutation = useAddProductFavorite();

  const handleHeartToggle = async () => {
    try {
      let updatedProduct: ProductDetailResponse;

      if (isHeartLiked) {
        updatedProduct = await productAPI.removeProductFavorite(product.id);
      } else {
        updatedProduct = await productAPI.addProductFavorite(product.id);
      }

      setIsHeartLiked(updatedProduct.isFavorite);
      setFavoriteCount(updatedProduct.favoriteCount);
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-6 mb-6 md:mb-10 border-b border-gray-200">
      <div className="mb-4 md:mb-10 md:flex-shrink-0">
        <Image
          src={product.images[0] || "/image/img_empty.png"}
          alt={product.name}
          width={344}
          height={343}
          className="w-full h-auto aspect-square rounded-xl md:w-[340px] xl:w-[486px]"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="border-b border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h1>
            <Image
              src="/icon/ic_kebab.svg"
              alt="메뉴"
              width={24}
              height={24}
              className="w-6 h-6 flex items-center justify-center"
            />
          </div>

          <p className="text-2xl font-semibold text-gray-800 mb-4">
            {product.price.toLocaleString()}원
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-10 xl:mb-[62px]">
          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-2">
              상품 소개
            </h2>
            <p className="text-lg font-regular text-gray-800 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-md font-semibold text-gray-800 mb-2">
              상품 태그
            </h2>
            <div className="flex gap-2">
              {product.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[18px]">
              <Image
                src="/icon/ic_profile.png"
                alt="프로필"
                width={40}
                height={40}
                className="w-10 h-10 flex items-center justify-center"
              />
              <div className="flex flex-col">
                <span className="text-md font-medium text-gray-600">
                  {product.ownerNickname}
                </span>
                <span className="text-md font-regular text-gray-400">
                  {new Date(product.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ". ")
                    .replace(/\s/g, "")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center border-l border-gray-200">
              <Button
                variant="heart"
                size="heart-small"
                heartIcon={isHeartLiked ? "pink" : "line"}
                onClick={handleHeartToggle}
                className="ml-6"
              >
                {favoriteCount}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
