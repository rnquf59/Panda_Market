import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-[#DFDFDF]">
      <div className="px-4 py-[15px]">
        <div className="flex justify-between items-center">
          {/* 왼쪽 네비게이션 링크들 */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/logo/panda_text_logo.png"
                alt="판다마켓"
                width={81}
                height={40}
                className="h-10"
              />
            </Link>
            <Link href="/board" className="text-lg font-bold text-gray-600">
              자유게시판
            </Link>
            <Link href="/item" className="text-lg font-bold text-gray-600 ">
              중고마켓
            </Link>
          </div>

          {/* 오른쪽 프로필 아이콘 */}
          <div className="flex items-center">
            <button className="cursor-pointer">
              <Image
                src="/icon/ic_profile.svg"
                alt="프로필"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
