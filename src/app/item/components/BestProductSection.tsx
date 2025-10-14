import { ProductCard } from "@/types/product";
import BestProduct from "./BestProduct";

interface BestPrdouctSectionProps {
  bestProducts: ProductCard[];
}

export default function BestPrdouctSection({
  bestProducts,
}: BestPrdouctSectionProps) {
  return (
    <section className="mb-6 md:mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">베스트 상품</h2>
      {bestProducts.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">베스트 상품을 불러오는 중...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {bestProducts.slice(0, 4).map((product) => (
            <BestProduct key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
