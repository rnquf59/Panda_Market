import Button from "@/components/ui/Button";

interface AddItemHeaderPRops {
  isFormValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function AddItemHeader({
  isFormValid,
  isLoading,
  onSubmit,
}: AddItemHeaderPRops) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">상품 등록하기</h1>
      <Button
        variant="primary"
        size="small-40"
        disabled={!isFormValid || isLoading}
        onClick={onSubmit}
      >
        {isLoading ? "등록 중..." : "등록"}
      </Button>
    </div>
  );
}
