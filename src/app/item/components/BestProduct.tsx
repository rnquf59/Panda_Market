import Image from "next/image";

interface BestProductProps {
  title: string;
  price: string;
  likes: number;
  image: string;
}

export default function BestProduct({
  title,
  price,
  likes,
  image,
}: BestProductProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 아이템 사진 */}
      <div className="relative w-full">
        <Image
          src={image}
          alt={title || "상품 이미지"}
          width={168}
          height={168}
          className={`w-full object-cover rounded-[19.46px] ${
            image === "/items/img_empty.png"
              ? "bg-gray-50 aspect-square"
              : "aspect-square"
          }`}
        />
      </div>
      {/* 아이템 정보 */}
      <div className="flex flex-col gap-1.5 text-left">
        <h3 className=" text-md font-medium text-gray-800">{title}</h3>
        <span className="text-lg font-bold text-gray-800">{price}</span>
        <div className="flex items-center gap-1">
          <Image
            src="/icon/ic_heart_line.svg"
            alt="좋아요"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-gray-600">{likes}</span>
        </div>
      </div>
    </div>
  );
}
