import ItemNavbar from "@/components/layout/ItemNavbar";
import ProductCard from "../item/components/ProductCard";
import ProductList from "../item/components/ProductList";

export default function TestPage() {
  const mockProducts = [
    {
      id: 1,
      title: "아이폰 15 Pro",
      price: "₩1,500,000",
      likes: 25,
      image: "/image/img_empty.png",
    },
    {
      id: 2,
      title: "맥북 프로 16인치",
      price: "₩3,200,000",
      likes: 42,
      image: "/image/img_empty.png",
    },
    {
      id: 3,
      title: "에어팟 프로 2세대",
      price: "₩350,000",
      likes: 18,
      image: "/image/img_empty.png",
    },
    {
      id: 4,
      title: "애플워치 시리즈 9",
      price: "₩599,000",
      likes: 33,
      image: "/image/img_empty.png",
    },
  ];
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
        <div className="mb-12">
          <h3 className="text-md font-medium mb-4">ProductList 정상상태</h3>
          <ProductList products={mockProducts} isLoading={false} error={null} />
        </div>
      </main>
    </div>
  );
}
