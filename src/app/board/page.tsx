import { BestArticle } from "@/types/article";
import BestPostSection from "./_components/BestPostSection";

export default function BoardPage() {
  const bestPosts: BestArticle[] = [
    {
      id: 1,
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
      content: "게시글 내용입니다.",
      image: "/image/img_empty.png",
      writer: {
        id: 1,
        nickname: "사용자1",
      },
      likeCount: 12,
      createdAt: "2024-04-16T00:00:00.000Z",
      updatedAt: "2024-04-16T00:00:00.000Z",
    },
  ];
  return (
    <>
      <BestPostSection bestPosts={bestPosts} />
    </>
  );
}
