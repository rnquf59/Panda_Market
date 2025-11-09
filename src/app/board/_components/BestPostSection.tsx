import { BestArticle } from "@/types/article";
import BestPostItem from "./BestPostItem";
import { useEffect, useState } from "react";

interface BestPostSectionProps {
  bestPosts: BestArticle[];
  isLoading?: boolean;
  error?: string | null;
}

export default function BestPostSection({
  bestPosts,
  isLoading = false,
  error = null,
}: BestPostSectionProps) {
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    const updateDisplayCount = () => {
      if (window.innerWidth >= 1024) {
        setDisplayCount(3);
      } else if (window.innerWidth >= 768) {
        setDisplayCount(2);
      } else {
        setDisplayCount(1);
      }
    };

    updateDisplayCount();
    window.addEventListener("resize", updateDisplayCount);
  }, []);

  const displayedPosts = bestPosts.slice(0, displayCount);
  return (
    <section className="flex flex-col mb-4">
      <h2 className="text-2lg font-extrabold text-gray-800 mb-4">
        베스트 게시글
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">베스트 게시글을 불러오는 중...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">{error}</div>
        </div>
      ) : bestPosts.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">베스트 게시글이 없습니다</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {displayedPosts.map((post) => (
            <BestPostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
