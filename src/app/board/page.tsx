import BestPostSection from "./_components/BestPostSection";
import { useBestArticles } from "@/hooks/useArticles";

export default function BoardPage() {
  const { data: BestArticleResponse, isLoading, error } = useBestArticles(3);
  const bestPosts = BestArticleResponse?.list || [];
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "베스트 게시글을 불러오는데 실패했습니다."
    : null;
  return (
    <>
      <BestPostSection
        bestPosts={bestPosts}
        isLoading={isLoading}
        error={errorMessage}
      />
    </>
  );
}
