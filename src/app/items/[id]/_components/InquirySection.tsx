"use client";

import InquiryItem from "./InquiryItem";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import useInquirySection from "../hooks/useInquirySection";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

interface InquirySectionProps {
  productId: number;
}

export default function InquirySection({ productId }: InquirySectionProps) {
  const {
    comments,
    loading,
    hasMore,

    inquiryText,
    setInquiryText,
    inquiryLoading,

    editingInquiry,
    editText,
    setEditText,
    showDropdown,

    loadMore,
    handleSubmitInquiry,
    handleEditInquiry,
    handleCancelEdit,
    handleSaveEdit,
    handleDeleteInquiry,
    onDropdownToggle,
  } = useInquirySection({ productId });
  return (
    <div className="flex flex-col gap-10">
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
            disabled={!inquiryText.trim() || inquiryLoading}
            onClick={handleSubmitInquiry}
          >
            {inquiryLoading ? "등록 중..." : "등록"}
          </Button>
        </div>
      </div>

      <div
        className={`flex flex-col ${
          comments.length > 0 ? "md:mb-4 xl:mb-6" : ""
        }`}
      >
        {comments.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center gap-2 mb-2">
            <Image
              src="/image/Img_inquiry_empty.png"
              alt="문의없음"
              width={196}
              height={196}
              className="w-[140px] xl:w-[196px] h-auth"
            />
            <p className="text-lg font-regular text-gray-400 text-center">
              아직 문의가 없어요
            </p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={comments.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="text-center py-8 text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-2"></div>
                <div>댓글을 불러오는 중...</div>
              </div>
            }
            scrollableTarget="window"
            scrollThreshold={0.9}
          >
            {comments.map((comment) => (
              <InquiryItem
                key={comment.id}
                comment={comment}
                editingInquiry={editingInquiry}
                editText={editText}
                showDropdown={showDropdown}
                onEditStart={handleEditInquiry}
                onEditCancel={handleCancelEdit}
                onEditSave={handleSaveEdit}
                onEditTextChange={setEditText}
                onDelete={handleDeleteInquiry}
                onDropdownToggle={onDropdownToggle}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>

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
  );
}
