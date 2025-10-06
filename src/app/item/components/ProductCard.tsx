import { ProductCard as ProductCardType } from "@/app/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: ProductCardType;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 아이템 사진 */}
      <div className="relative w-full">
        <Image
          src={product.image}
          alt={product.title || "상품 이미지"}
          width={168}
          height={168}
          className={`w-full object-cover rounded-[19.46px] ${
            product.image === "/image/img_empty.png"
              ? "bg-gray-50 aspect-square"
              : "aspect-square"
          }`}
        />
      </div>
    </div>
  );
}
