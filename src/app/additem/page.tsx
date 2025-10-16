"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

export default function AddItemPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 제목과 등록 버튼 */}
      <div className="flex justify-between items-center">
        <h1 className="">상품 등록하기</h1>
        <Button variant="primary" size="small-40" disabled>
          등록
        </Button>
      </div>

      {/* 상품 이미지 */}
      <div>
        <h2 className="text-2lg font-bold text-gray-800 mb-4">상품 이미지</h2>
        <div className="w-[168px] h-[168px] lg:w-[282px] lg:h-[282px] rounded-xl bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/icon/ic_plus.svg"
              alt="이미지 추가"
              width={48}
              height={48}
            />
            <span className="text-lg font-regular text-gray-400">
              이미지 등록
            </span>
          </div>
        </div>

        {/* 상품 명 */}
        <div>
          <h2 className="text-2lg font-bold text-gray-800 mb-4">상품명</h2>
          <Input type="text" placeholder="상품명을 입력해주세요" />
        </div>

        {/* 상품 소개 */}
        <div>
          <h2 className="text-2lg font-bold text-gray-800 mb-4">상품 소개</h2>
            <           
        </div>
        
        <div>
          <h2 className="text-2lg font-bold text-gray-800 mb-4">판매가격</h2>
                   
        </div>
        
        <div>
          <h2 className="text-2lg font-bold text-gray-800 mb-4">판매가격</h2>
                   
        </div>
      </div>
    </div>
  );
}
