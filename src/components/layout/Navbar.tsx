import { useStore } from "@/stores/useStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const isLandingPage = pathname === "/";

  const isItemPage = pathname === "/item" || pathname === "/additem";

  if (isLandingPage) {
    return (
      <nav className="bg-white py-[9.5px]">
        <div
          className="
          mx-auto 
          px-4 
          md:px-6 
          lg:px-[200px] 
          flex justify-between items-center
        "
        >
          <Link href="/">
            <Image
              src="/logo/panda_logo.png"
              alt="판다마켓 로고"
              width={153}
              height={51}
              className="cursor-pointer"
            />
          </Link>

          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer"
              >
                <Image
                  src="/icon/ic_profile.svg"
                  alt="프로필"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-[102px] h-[49px] md:w-[139px] md:h-[51px] flex items-center justify-center text-md font-regular text-gray-500"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <Button variant="primary" size="small-48">
                로그인
              </Button>
            </Link>
          )}
        </div>
      </nav>
    );
  }

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
            <Link
              href="/item"
              className={`text-lg font-bold ${
                isItemPage ? "text-primary-100" : "text-gray-600"
              }`}
            >
              중고마켓
            </Link>
          </div>

          {/* 오른쪽 프로필 아이콘 */}
          <div className="flex items-center">
            {user.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer"
                >
                  <Image
                    src="/icon/ic_profile.png"
                    alt="프로필"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="w-[102px] h-[49px] md:w-[139px] md:h-[51px] flex items-center justify-center text-md font-regular text-gray-500"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-100"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
