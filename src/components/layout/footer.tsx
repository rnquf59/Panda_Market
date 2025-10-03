import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white h-[15vh] pt-8">
      <div
        className="
        mx-auto 
        px-4 
        md:px-6 
        lg:px-[min(400px,20vw)]
        w-full
      "
      >
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* 첫 번째 요소: 저작권 텍스트 (PC에서는 첫번째, 모바일에서는 마지막) */}
          <div className="flex-basis-full sm:flex-basis-auto order-3 md:order-1">
            <p
              className="
              font-pretendard 
              text-gray-400 
              text-sm
            "
            >
              ©codeit - 2024
            </p>
          </div>

          {/* 두 번째 요소: Privacy Policy와 FAQ */}
          <div className="flex gap-[30px] order-1 md:order-2">
            <a
              href="#"
              className="
              font-pretendard 
              text-gray-200 
              hover:text-white 
              transition-colors
              text-sm
            "
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="
              font-pretendard 
              text-gray-200 
              hover:text-white 
              transition-colors
              text-sm
            "
            >
              FAQ
            </a>
          </div>

          {/* 세 번째 요소: 소셜 미디어 아이콘들 */}
          <div className="flex gap-[13px] order-2 md:order-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
              w-5 
              h-5 
              flex 
              items-center 
              justify-center
              cursor-pointer
            "
            >
              <Image
                src="/icon/ic_facebook.png"
                alt="Facebook"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
              w-5 
              h-5 
              flex 
              items-center 
              justify-center
              cursor-pointer
            "
            >
              <Image
                src="/icon/ic_twitter.png"
                alt="Twitter"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
              w-5 
              h-5 
              flex 
              items-center 
              justify-center
              cursor-pointer
            "
            >
              <Image
                src="/icon/ic_youtube.png"
                alt="YouTube"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
              w-5 
              h-5 
              flex 
              items-center 
              justify-center
              cursor-pointer
            "
            >
              <Image
                src="/icon/ic_instagram.png"
                alt="Instagram"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
