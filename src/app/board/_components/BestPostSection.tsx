import { BestArticle } from "@/types/article";
import BestPostItem from "./BestPostItem";

interface BestPostSectionProps {
  bestPosts: BestArticle[];
}

export default function BestPostSection({ bestPosts }: BestPostSectionProps) {
  return (
    <section className="flex flex-col mb-4">
      <h2 className="text-2lg font-extrabold text-gray-800 mb-4">
        베스트 게시글
      </h2>
      {bestPosts.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">베스트 게시글을 불러오는 중...</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bestPosts.map((post) => (
            <BestPostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
