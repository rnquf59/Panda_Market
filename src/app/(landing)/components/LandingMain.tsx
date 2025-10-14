import Image from "next/image";

export default function LandingMain() {
  return (
    <div className="bg-white flex flex-col gap-[276px] pt-[52px] pb-[83px] px-4 md:px-6 md:pt-6 md:pb-14 lg:pt-[138px] lg:pb-[276px] lg:px-0 max-w-4xl mx-auto">
      {/* Hot Item 섹션 - PC에서 이미지 왼쪽, 텍스트 오른쪽 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* home_01.png 이미지 */}
        <div className="mb-6 lg:mb-0 lg:flex-1">
          <Image
            src="/image/home_01.png"
            alt="Hot Item"
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="lg:flex-1">
          {/* "Hot item" 텍스트 */}
          <div className="mb-2">
            <span
              className="
              text-lg 
              font-bold 
              text-primary-100
            "
            >
              Hot item
            </span>
          </div>

          {/* "인기 상품을 확인해보세요" 텍스트 */}
          <div className="mb-4">
            <h2
              className="
              text-2xl 
              font-bold 
              text-gray-700
            "
            >
              <span className="block md:hidden lg:block">
                인기 상품을
                <br />
                확인해 보세요
              </span>
              <span className="hidden md:block lg:hidden">
                인기 상품을 확인해보세요
              </span>
            </h2>
          </div>

          {/* 설명 텍스트 */}
          <div>
            <p
              className="
              text-lg 
              font-medium 
              text-gray-700
            "
            >
              가장 HOT한 중고거래 물품을 <br />
              판다 마켓에서 확인해보세요
            </p>
          </div>
        </div>
      </div>

      {/* Search 섹션 - PC에서 이미지 오른쪽, 텍스트 왼쪽 */}
      <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-16">
        {/* home_02.png 이미지 */}
        <div className="mb-6 lg:mb-0 lg:flex-1">
          <Image
            src="/image/home_02.png"
            alt="Search"
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="lg:flex-1 text-right lg:text-right">
          {/* "Search" 텍스트 */}
          <div className="mb-2">
            <span
              className="
              text-lg 
              font-bold 
              text-primary-100
            "
            >
              Search
            </span>
          </div>

          {/* "구매를 원하는 상품을 검색하세요" 텍스트 */}
          <div className="mb-4">
            <h2
              className="
              text-2xl 
              font-bold 
              text-gray-700
            "
            >
              <span className="block md:hidden lg:block">
                구매를 원하는
                <br />
                상품을 검색하세요
              </span>
              <span className="hidden md:block lg:hidden">
                구매를 원하는 상품을 검색하세요
              </span>
            </h2>
          </div>

          {/* 설명 텍스트 */}
          <div>
            <p
              className="
              text-lg 
              font-medium 
              text-gray-700
            "
            >
              구매하고 싶은 물품은 검색해서 <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
      </div>

      {/* Register 섹션 - PC에서 이미지 왼쪽, 텍스트 오른쪽 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* home_03.png 이미지 */}
        <div className="mb-6 lg:mb-0 lg:flex-1">
          <Image
            src="/image/home_03.png"
            alt="Register"
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="lg:flex-1">
          {/* "Register" 텍스트 */}
          <div className="mb-2">
            <span
              className="
              text-lg 
              font-bold 
              text-primary-100
            "
            >
              Register
            </span>
          </div>

          {/* "판매를 원하는 상품을 등록하세요" 텍스트 */}
          <div className="mb-4">
            <h2
              className="
              text-2xl 
              font-bold 
              text-gray-700
            "
            >
              <span className="block md:hidden lg:block">
                판매를 원하는
                <br />
                상품을 등록하세요
              </span>
              <span className="hidden md:block lg:hidden">
                판매를 원하는 상품을 등록하세요
              </span>
            </h2>
          </div>

          {/* 설명 텍스트 */}
          <div>
            <p
              className="
              text-lg 
              font-medium 
              text-gray-700
            "
            >
              어떤 물건이든 판매하고 싶은 상품을 <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
