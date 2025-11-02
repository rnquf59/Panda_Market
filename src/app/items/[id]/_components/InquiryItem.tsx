import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Textarea from "@/components/ui/Textarea";
import { useStore } from "@/stores/useStore";
import { Comment } from "@/types/product";
import Image from "next/image";

interface InquiryItemProps {
  comment: Comment;
  editingInquiry: number | null;
  editText: string;
  showDropdown: number | null;
  onEditStart: (commentId: number, currentContent: string) => void;
  onEditCancel: () => void;
  onEditSave: () => void;
  onEditTextChange: (text: string) => void;
  onDelete: (commentId: number) => void;
  onDropdownToggle: (commentId: number) => void;
}

export default function InquiryItem({
  comment,
  editingInquiry,
  editText,
  showDropdown,
  onEditStart,
  onEditCancel,
  onEditSave,
  onEditTextChange,
  onDelete,
  onDropdownToggle,
}: InquiryItemProps) {
  const { user } = useStore();
  const isEditing = editingInquiry === comment.id;
  const isDropdownOpen = showDropdown === comment.id;
  const userId = user.id ? Number(user.id) : null;
  const isMyComment =
    user.isLoggedIn && userId !== null && userId === comment.writer.id;

  return (
    <div className="border-b border-gray-200 mb-3">
      {isEditing ? (
        <div className="flex flex-col gap-4 mb-3">
          <Textarea
            value={editText}
            onChange={(e) => onEditTextChange(e.target.value)}
            className="min-h-[80px]"
            placeholder="문의 내용을 입력해주세요"
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={comment.writer.image || "/icon/ic_profile.svg"}
                alt="프로필"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-regular text-gray-600">
                  {comment.writer.nickname}
                </span>
                <span className="text-xs font-regular text-gray-400">
                  {new Date(comment.createdAt)
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

            <div className="flex gap-1">
              <button
                onClick={onEditCancel}
                className="px-4 py-2 text-lg font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              >
                취소
              </button>
              <Button
                variant="primary"
                size="small-40"
                onClick={onEditSave}
                disabled={!editText.trim()}
              >
                수정완료
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex flex-col gap-6">
            <p className="text-md font-regular text-gray-800">
              {comment.content}
            </p>

            <div className="flex items-center gap-2">
              <Image
                src={comment.writer.image || "/icon/ic_profile.svg"}
                alt="프로필"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-regular text-gray-600">
                  {comment.writer.nickname}
                </span>
                <span className="text-xs font-regular text-gray-400">
                  {new Date(comment.createdAt)
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
          </div>

          {isMyComment && (
            <div className="relative">
              <Image
                src="/icon/ic_kebab.svg"
                alt="메뉴"
                width={24}
                height={24}
                className="w-6 h-6 flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDropdownToggle(comment.id);
                }}
              />
              {isDropdownOpen && (
                <div
                  className="absolute top-10 right-0 z-50 dropdown-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Dropdown
                    variant="medium"
                    className="xl:hidden"
                    onClick={() => {
                      onEditStart(comment.id, comment.content);
                    }}
                  >
                    <span>수정</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(comment.id);
                      }}
                    >
                      삭제
                    </span>
                  </Dropdown>
                  <Dropdown
                    variant="large"
                    className="hidden xl:block"
                    onClick={() => {
                      onEditStart(comment.id, comment.content);
                    }}
                  >
                    <span>수정</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(comment.id);
                      }}
                    >
                      삭제
                    </span>
                  </Dropdown>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
