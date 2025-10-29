"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (pathname === "/") {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <main className="px-[15px] pt-[17px] pb-[35px] md:px-6 xl:px-0 xl:max-w-[1200px] xl:mx-auto">
          {children}
        </main>
      </div>
    </>
  );
}
