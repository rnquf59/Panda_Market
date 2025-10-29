import { commentAPI } from "@/api/comments";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/hooks/useComments";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Comment } from "@/types/product";
import { useEffect, useState } from "react";

interface UseInquirySectionProps {
  productId: number;
}

export default function useInquirySection({
  productId,
}: UseInquirySectionProps) {
  const {
    data: comments,
    isLoading: loading,
    hasNextPage: hasMore,
    fetchNextPage: loadMore,
  } = useInfiniteScroll<Comment>({
    queryKey: ["comments", productId],
    queryFn: ({ cursor, limit }) =>
      commentAPI.getProductComments({
        productId,
        cursor,
        limit,
      }),
    initialLimit: 7,
    limit: 5,
  });

  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const [inquiryText, setInquiryText] = useState("");
  const [editingInquiry, setEditingInquiry] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [showDropdown, setShowDropdown] = useState<number | null>(null);

  const handleSubmitInquiry = async () => {
    if (!inquiryText.trim()) return;

    try {
      await createCommentMutation.mutateAsync({
        productId,
        content: inquiryText,
      });
      setInquiryText("");
    } catch (error) {
      console.error("문의 등록 실패:", error);
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
      await updateCommentMutation.mutateAsync({
        commentId: editingInquiry!,
        content: editText,
      });
      setEditingInquiry(null);
      setEditText("");
    } catch (error) {
      console.error("문의 수정 실패:", error);
    }
  };

  const handleDeleteInquiry = async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
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
    inquiryLoading: createCommentMutation.isPending,

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
