"use client";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Tag from "@/components/ui/Tag";
import Textarea from "@/components/ui/Textarea";
import { ProductDetailResponse } from "@/types/product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Inquiry {
  id: number;
  content: string;
  author: string;
  date: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryText, setInquiryText] = useState("");
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [isHeartLiked, setIsHeartLiked] = useState(false);

  const [editingInquiry, setEditingInquiry] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleEditInquiry = (InquiryID: number, currentContent: string) => {
    setEditingInquiry(InquiryID);
    setEditText(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingInquiry(null);
    setEditText("");
  };

  const handleSaveEdit = () => {
    setEditingInquiry(null);
    setEditText("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest(".dropdown-container")) {
        return;
      }
      setShowDropdown(null);
    };

    if (showDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex flex-col">
      {/* 상품 정보 영역 (이미지 + 상품 정보) */}
      <div className="flex flex-col md:flex-row md:gap-6 mb-6 md:mb-10 border-b border-gray-200 ">
        {/* 1. 상품 이미지 */}
        <div className="mb-4 md:mb-0 md:flex-shrink-0">
          <Image
            src="/image/img_empty.png"
            alt="상품 이미지"
            width={344}
            height={343}
            className="w-full h-auto aspect-square rounded-xl md:w-[340px] xl:w-[486px]"
          />
        </div>

        {/* 우측 컨텐츠 영역 */}
        <div className="flex flex-col flex-1">
          {/* 2. 제목과 가격 */}
          <div className="border-b border-gray-200 mb-4">
            {/* 제목과 케밥 아이콘 */}
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg font-semibold text-gray-800">
                아이패드 미니 6세대
              </h1>
              <Image
                src="/icon/ic_kebab.svg"
                alt="메뉴"
                width={24}
                height={24}
                className="w-6 h-6 flex items-center justify-center"
              />
            </div>

            {/* 가격 */}
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              500,000원
            </p>
          </div>

          {/* 3. 상품 소개 및 태그 */}
          <div className="flex flex-col gap-6 mb-10 xl:mb-[62px]">
            {/* 상품 소개 */}
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2">
                상품 소개
              </h2>
              <p className="text-lg font-regular text-gray-800">
                액정에 잔기스랑 주변부 스크래치있습니다만
                <br />
                예민하신분아니면 전혀 신경쓰이지않을정도입니다.
                <br />
                박스 보관중입니다.
                <br />
                메모용과 넷플릭스용으로만쓰던거라 뭘 해보질 않아 기능이나
                문제점을 못느꼈네요
                <br />
                잘 안써서 싸게넘깁니다!
                <br />
                택배거래안합니다.
              </p>
            </div>

            {/* 상품 태그 */}
            <div>
              <h2 className="text-md font-semibold text-gray-800 mb-2">
                상품 태그
              </h2>
              <div className="flex gap-2">
                <Tag>아이패드미니</Tag>
                <Tag>애플</Tag>
                <Tag>가성비</Tag>
              </div>
            </div>
          </div>

          {/* 4. 프로필, 닉네임, 기간, 하트 */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center">
              {/* 프로필/닉네임/기간 묶음 */}
              <div className="flex items-center gap-[18px]">
                <Image
                  src="/icon/ic_profile.svg"
                  alt="프로필"
                  width={40}
                  height={40}
                  className="w-10 h-10 flex items-center justify-center"
                />
                <div className="flex flex-col">
                  <span className="text-md font-medium text-gray-600">
                    판다마켓
                  </span>
                  <span className="text-md font-regular text-gray-400">
                    2024. 01. 02
                  </span>
                </div>
              </div>

              {/* 하트 버튼 */}
              <div className="flex items-center justify-center border-l border-gray-200">
                <Button
                  variant="heart"
                  size="heart-small"
                  heartIcon={isHeartLiked ? "pink" : "line"}
                  onClick={() => setIsHeartLiked(!isHeartLiked)}
                  className="ml-6"
                >
                  {isHeartLiked ? 124 : 123}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 문의 영역 */}
      <div className="flex flex-col gap-10">
        {/* 1. 문의하기 */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-[9px]">
            문의하기
          </h2>

          <div className="mb-4">
            <Textarea
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
              className="min-h-[129px] md:min-h-[104px]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="small-40"
              disabled={!inquiryText.trim()}
            >
              등록
            </Button>
          </div>
        </div>

        {/* 2. 기존 문의들 */}
        <div className="flex flex-col gap-4 mb-10">
          {mockInquiries.map((inquiry) => (
            <div key={inquiry.id} className="border-b border-gray-200 mb-3">
              {editingInquiry === inquiry.id ? (
                // 수정 모드
                <div className="flex flex-col gap-4 mb-3">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="min-h-[80px]"
                    placeholder="문의 내용을 입력해주세요"
                  />

                  <div className="flex justify-between items-center">
                    {/* 프로필 정보 */}
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icon/ic_profile.svg"
                        alt="프로필"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-regular text-gray-600">
                          {inquiry.author}
                        </span>
                        <span className="text-xs font-regular text-gray-400">
                          {inquiry.date}
                        </span>
                      </div>
                    </div>

                    {/* 취소/수정완료 버튼 */}
                    <div className="flex gap-1">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-lg font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        취소
                      </button>
                      <Button
                        variant="primary"
                        size="small-40"
                        onClick={handleSaveEdit}
                        disabled={!editText.trim()}
                      >
                        수정완료
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // 일반 모드
                <div className="flex justify-between items-start gap-4 mb-3">
                  {/* 문의 내용과 프로필 */}
                  <div className="flex flex-col gap-6">
                    <p className="text-md font-regular text-gray-800">
                      {inquiry.content}
                    </p>

                    <div className="flex items-center gap-2">
                      <Image
                        src="/icon/ic_profile.svg"
                        alt="프로필"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-regular text-gray-600">
                          {inquiry.author}
                        </span>
                        <span className="text-xs font-regular text-gray-400">
                          {inquiry.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 케밥 아이콘 */}
                  <div className="relative">
                    <Image
                      src="/icon/ic_kebab.svg"
                      alt="메뉴"
                      width={24}
                      height={24}
                      className="w-6 h-6 flex-shrink-0 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(
                          showDropdown === inquiry.id ? null : inquiry.id
                        );
                      }}
                    />
                    {showDropdown === inquiry.id && (
                      <div
                        className="absolute top-10 right-0 z-50 dropdown-container"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Dropdown
                          variant="medium"
                          className="xl:hidden"
                          onClick={() => {
                            handleEditInquiry(inquiry.id, inquiry.content);
                            setShowDropdown(null);
                          }}
                        >
                          <span>수정</span>
                          <span>삭제</span>
                        </Dropdown>
                        <Dropdown
                          variant="large"
                          className="hidden xl:block"
                          onClick={() => {
                            handleEditInquiry(inquiry.id, inquiry.content);
                            setShowDropdown(null);
                          }}
                        >
                          <span>수정</span>
                          <span>삭제</span>
                        </Dropdown>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 3. 뒤로가기 버튼 */}
        <div className="flex justify-center">
          <Button
            variant="back"
            size="back"
            onClick={() => (window.location.href = "/items")}
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
