"use client";

import ItemNavbar from "@/components/layout/ItemNavbar";
import ProductCard from "./components/ProductCard";
import { useItemPage } from "./hooks/useItemPage";

export default function ItemPage() {
  const {} = useItemPage();

  return (
    <div className="min-h-screen bg-white">
      <ItemNavbar />
      <main className="px-[15px] pt-[17px] pb-[35px] md:px-6 xl:px-0 xl:max-w-[1200px]">
        <section className="mb-6 md:mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">베스트 상품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap6">
            <ProductCard product={mockProducts[0]} />
          </div>
        </section>
      </main>
    </div>
  );
}
