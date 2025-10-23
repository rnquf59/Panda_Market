import { commentAPI } from "@/api/comments";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Comment, CommentListParams } from "@/types/product";
import { useEffect, useState } from "react";

interface UseInquirySectionProps {
  productId: number;
}

export default function useInquirySection({
  productId,
}: UseInquirySectionProps) {
  const {
    data: comments,
    loading,
    hasMore,
    loadMore,
    refresh,
    loadInitialData,
  } = useInfiniteScroll<Comment, CommentListParams>({
    fetchFunction: commentAPI.getProductComments,
    initialParams: { productId, limit: 7 },
    limit: 5,
    loadingDelay: 700,
  });

  const [inquiryText, setInquiryText] = useState("");
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (productId) {
      loadInitialData();
    }
  }, [productId, loadInitialData]);

  const handleSubmitInquiry = async () => {
    if (!inquiryText.trim()) return;

    try {
      setInquiryLoading(true);
      await commentAPI.createProductComment(productId, inquiryText);
      await refresh();
      setInquiryText("");
    } catch (error) {
      console.error("문의 등록 실패:", error);
    } finally {
      setInquiryLoading(false);
    }
  };

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
      await refresh();
      setEditingInquiry(null);
      setEditText("");
    } catch (error) {
      console.error("문의 수정 실패:", error);
    }
  };

  const handleDeleteInquiry = async (commentId: number) => {
    try {
      await commentAPI.deleteComment(commentId);
      await refresh();
      setShowDropdown(null);
    } catch (error) {
      console.error("문의 삭제 실패:", error);
    }
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
  return {
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
    onDropdownToggle: (commentId: number) =>
      setShowDropdown(showDropdown === commentId ? null : commentId),
  };
}
