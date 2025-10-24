import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import QueryProvider from "@/components/providers/QueryProvider";

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
        <QueryProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
