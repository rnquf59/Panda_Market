"use client";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import SortDropdown from "@/components/ui/SortDropdown";
import Image from "next/image";
import { useMemo, useState } from "react";

interface BoardPost {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  likeCount: number;
  image: string;
}
const sortOptions = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순," },
];

const mockPosts: BoardPost[] = [
  {
    id: 1,
    title: "중고 맥북 프로 판매합니다. 상태 최상!",
    writer: "파란곰돌",
    createdAt: "2024-04-10T00:00:00.000Z",
    likeCount: 12,
    image: "/image/img_empty.png",
  },
  {
    id: 2,
    title: "아이패드 프로 12.9 5세대 미개봉 팝니다",
    writer: "태블릿덕후",
    createdAt: "2024-04-12T00:00:00.000Z",
    likeCount: 25,
    image: "/image/img_empty.png",
  },
  {
    id: 3,
    title: "게이밍 키보드 추천 좀 해주세요",
    writer: "키보드장인",
    createdAt: "2024-04-08T00:00:00.000Z",
    likeCount: 5,
    image: "/image/img_empty.png",
  },
];

export default function BoardPostSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "favorite">("recent");

  const formattedPosts = useMemo(() => {
    const filtered = mockPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "favorite") {
        return b.likeCount - a.likeCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return sorted;
  }, [searchQuery, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}. ${month} ${day}`;
  };

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between mb-4 md:mb-12 lg:mb-6">
        <h2 className="flex-1 text-center text-2lg md:text-xl font-regular text-gray-800">
          게시글
        </h2>
        <Button variant="primary" size="small-40">
          글쓰기
        </Button>
      </div>

      <div className="flex items-center gap-[13px] md:gap-1.5 lg:gap-4 mb-4 md:mb-10 lg:mb-6">
        <SearchBar
          value={searchQuery}
          onSearch={(query) => setSearchQuery(query)}
          className="flex-1"
          inputClassName="w-full"
        />
        <SortDropdown
          value={sortBy}
          options={sortOptions}
          onChange={(value) => setSortBy(value as "recent" | "favorite")}
        />
      </div>

      <div className="flex flex-col gap-6">
        {formattedPosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col border-b border-gray-200 pb-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2lg font-semibold text-gray-800 flex-1">
                {post.title}
              </h3>
              <Image
                src={post.image}
                alt={post.title}
                width={72}
                height={72}
                className="w-[72px] h-[72px] rounded-lg border border-gray-200 flex-shrink-0 mr-2"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/ic_profile.png"
                  alt="프로필"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-md font-regular text-gray-600">
                  {post.writer}
                </span>
                <span className="text-md font-regular text-gray-400">
                  {formatDate(post.createdAt)}
                </span>
              </div>

              <div className="flex items-center">
                <Image
                  src="/icon/ic_heart_line.svg"
                  alt="좋아요"
                  width={25}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                <span className="text-lg font-regular text-gray-500">
                  {post.likeCount}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
