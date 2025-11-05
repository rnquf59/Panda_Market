import { BestArticle } from "@/types/article";
import Image from "next/image";

interface BestPostItemProps {
  post: BestArticle;
}

export default function BestPostItem({ post }: BestPostItemProps) {
  return (
    <div className="rounded-lg bg-gray-50 px-6 pb-4 flex flex-col">
      <div className="mb-4">
        <Image
          src="/image/img_badge.png"
          alt="베스트 게시글 배지"
          width={102}
          height={30}
          className="w-[102px] h-[30px]"
        />
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <h3 className="text-2lg font-semibold text-gray-800 flex-1">
            {post.title}
          </h3>
          <Image
            src={post.image}
            alt={post.title}
            width={72}
            height={72}
            className="w-[72px] h-[72px] border border-gray-200 rounded-lg flex-shrink-0"
            style={{ borderWidth: "0.75px" }}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="text-md font-regular text-gray-600">
              {post.writer.nickname}
            </span>
            <div className="flex items-center">
              <Image
                src="/icon/ic_heart_line.svg"
                alt="좋아요"
                width={16}
                height={16}
                className="w-4 h-4 mr-1"
              />
              <span className="text-md font-regular text-gray-500">
                {post.likeCount}
              </span>
            </div>
          </div>

          <span className="text-md font-regular text-gray-400">
            {(() => {
              const date = new Date(post.createdAt);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              return `${year}. ${month}. ${day}`;
            })()}
          </span>
        </div>
      </div>
    </div>
  );
}
