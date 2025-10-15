import Image from "next/image";
import Button from "../../../components/ui/Button";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <nav className="bg-white py-[9.5px]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/image/panda_logo.png"
            alt="판다마켓 로고"
            width={153}
            height={51}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/auth/login">
          <Button variant="primary" size="small-48">
            로그인
          </Button>
        </Link>
      </div>
    </nav>
  );
}
