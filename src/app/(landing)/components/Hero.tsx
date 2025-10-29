import Link from "next/link";
import Button from "../../../components/ui/Button";

export default function Hero() {
  return (
    <section
      className="pt-12 pb-0 relative bg-[#CFE5FF] bg-[url(/image/Img_home_top.png)] bg-contain bg-bottom bg-no-repeat min-h-[60vh] md:min-h-[70vh]  lg:min-h-[45vh] lg:pt-[140px] lg:bg-[length:clamp(500px,35%,800px)_auto] lg:bg-[right_40%_bottom]"
      id="hero-section"
    >
      <div
        className="
        mx-auto 
        px-4
        lg:px-8
        lg:max-w-[1200px]
        lg:w-full
      "
      >
        <div className="mx-auto text-center lg:text-left lg:ml-[90px] lg:w-auto">
          <h1
            className="
            text-3xl 
            md:text-[40px]
            lg:text-[40px] 
            font-bold 
            text-gray-700 
            leading-[140%]
          "
          >
            <span className="block md:hidden lg:block">
              일상의 모든 물건을
              <br />
              거래해보세요
            </span>
            <span className="hidden md:block lg:hidden">
              일상의 모든 물건을 거래해보세요
            </span>
          </h1>

          <div className="inline-block w-auto mt-[18px]">
            <Link href="/items">
              <Button variant="primary" size="medium" className="lg:size-large">
                구경하러 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
