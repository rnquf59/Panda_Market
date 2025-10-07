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
      {/* 아이템 정보 */}
      <div className="flex flex-col gap-1.5 text-left">
        <h3 className=" text-md font-medium text-gray-800">{product.title}</h3>
        <span className="text-lg font-bold text-gray-800">{product.price}</span>
        <div className="flex items-center gap-1">
          <Image
            src="/icon/ic_heart_line.svg"
            alt="좋아요"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-gray-600">
            {product.likes}
          </span>
        </div>
      </div>
    </div>
  );
}
