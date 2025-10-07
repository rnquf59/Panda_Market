import { ProductCard as ProductCardType } from "@/app/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: ProductCardType[];
  isLoading: boolean;
  error: string | null;
}

export default function ProductList({
  products,
  isLoading,
  error,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">상품을 불러오는중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">상품이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
