"use client";

import { useItemPage } from "./hooks/useItemPage";
import BestPrdouctSection from "./components/BestProductSection";
import SearchAndFilter from "./components/SearchAndFilter";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

export default function ItemPage() {
  const {
    bestProducts,
    searchQuery,
    sortBy,
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    setSearchQuery,
    handleSortChange,
    handlePageChange,
  } = useItemPage();

  return (
    <>
      <BestPrdouctSection bestProducts={bestProducts} />

      <SearchAndFilter
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onSortChange={handleSortChange}
      />

      <ProductList products={products} isLoading={isLoading} error={error} />

      {!isLoading && !error && products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
