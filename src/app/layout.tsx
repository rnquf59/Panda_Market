import type { Metadata } from "next";
import "./globals.css";
import NavbarProvider from "@/components/layout/NavbarProvider";

export const metadata: Metadata = {
  title: "판다마켓 - 믿을 수 있는 중고거래 플랫폼",
  description:
    "일상의 모든 물건을 안전하고 편리하게 거래해보세요. 판다마켓에서 중고거래의 새로운 경험을 만나보세요.",
  keywords: ["중고거래", "중고마켓", "판다마켓", "안전거래", "중고상품"],
  authors: [{ name: "판다마켓" }],
  openGraph: {
    title: "판다마켓 - 믿을 수 있는 중고거래 플랫폼",
    description: "일상의 모든 물건을 안전하고 편리하게 거래해보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <NavbarProvider />
        <div className="min-h-screen bg-white">
          <main className="px-[15px] pt-[17px] pb-[35px] md:px-6 xl:px-0 xl:max-w-[1200px] xl:mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
