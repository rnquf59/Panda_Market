"use client";

import { useState, useEffect } from "react";
import { Comment } from "@/types/product";
import { commentAPI } from "@/api/comments";
import InquiryItem from "./InquiryItem";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

interface InquirySectionProps {
  productId: number;
}

export default function InquirySection({ productId }: InquirySectionProps) {
  // 댓글 데이터 상태
  const [comments, setComments] = useState<Comment[]>([]);

  // 문의 입력 상태
  const [inquiryText, setInquiryText] = useState("");
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await commentAPI.getProductComments({
          productId,
          limit: 20, // 페이지당 20개 댓글
        });
        setComments(commentsData.list);
      } catch (err) {
        console.error("댓글 목록 조회 실패:", err);
        // 댓글 조회 실패는 에러로 표시하지 않고 빈 배열로 처리
        setComments([]);
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  // 댓글 목록 새로고침 함수
  const refreshComments = async () => {
    try {
      const commentsData = await commentAPI.getProductComments({
        productId,
        limit: 20,
      });
      setComments(commentsData.list);
    } catch (err) {
      console.error("댓글 목록 새로고침 실패:", err);
    }
  };

  // 문의 등록 함수
  const handleSubmitInquiry = async () => {
    if (!inquiryText.trim()) return;

    try {
      setInquiryLoading(true);
      await commentAPI.createProductComment(productId, inquiryText);
      await refreshComments(); // 댓글 목록 새로고침
      setInquiryText("");
    } catch (error) {
      console.error("문의 등록 실패:", error);
    } finally {
      setInquiryLoading(false);
    }
  };

  // 문의 수정 모드 함수들
  const handleEditInquiry = (commentId: number, currentContent: string) => {
    setEditingInquiry(commentId);
    setEditText(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingInquiry(null);
    setEditText("");
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;

    try {
      await commentAPI.updateComment(editingInquiry!, editText);
      await refreshComments(); // 댓글 목록 새로고침
      setEditingInquiry(null);
      setEditText("");
    } catch (error) {
      console.error("문의 수정 실패:", error);
    }
  };

  // 문의 삭제 함수
  const handleDeleteInquiry = async (commentId: number) => {
    try {
      await commentAPI.deleteComment(commentId);
      await refreshComments(); // 댓글 목록 새로고침
      setShowDropdown(null);
    } catch (error) {
      console.error("문의 삭제 실패:", error);
    }
  };

  // 드롭다운 외부 클릭 시 닫기
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
            disabled={!inquiryText.trim() || inquiryLoading}
            onClick={handleSubmitInquiry}
          >
            {inquiryLoading ? "등록 중..." : "등록"}
          </Button>
        </div>
      </div>

      {/* 2. 기존 문의들 */}
      <div className="flex flex-col gap-4 mb-10">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            아직 등록된 문의가 없습니다.
          </div>
        ) : (
          comments.map((comment) => (
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
              onDropdownToggle={(commentId) =>
                setShowDropdown(showDropdown === commentId ? null : commentId)
              }
            />
          ))
        )}
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
  );
}
