"use client";
import { useProducts } from "@/hooks/useProducts";
import ProtectedRoute from "@/routes/protectedRoute";
import { handleAddProductToCart } from "@/services/cartItemService";
import { ButtonFilterSection } from "@/ui/products/buttonFilterSection";
import { CategorySection } from "@/ui/products/categorySection";
import { ProductListSection } from "@/ui/products/productList/page";
import { useState } from "react";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState<string>("");
  const [isOpenFilterSidebar, setIsOpenFilterSidebar] =
    useState<boolean>(false);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = filter
    ? products.filter((p) => p.category === filter)
    : products;

  if (loading) return <p className="text-center">Carregando...</p>;

  if (error) return <p className="text-center">{error}</p>;

  if (products.length === 0)
    return <p className="text-center">Carregando...</p>;

  return (
    <ProtectedRoute>
      <main className="w-full h-full px-4 py-2 mt-10 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Nossos Produtos</h1>

        <ButtonFilterSection
          isOpenFilterSidebar={isOpenFilterSidebar}
          setIsOpenFilterSidebar={setIsOpenFilterSidebar}
        />

        <CategorySection
          isOpenFilterSidebar={isOpenFilterSidebar}
          filter={filter}
          categories={categories}
          handleCategoryFilter={setFilter}
          handleClearFilter={() => setFilter("")}
        />

        {filteredProducts.length > 0 ? (
          <ProductListSection
            filteredProducts={filteredProducts}
            handleAddProductToCart={handleAddProductToCart}
          />
        ) : (
          <p className="text-center">Nenhum produto encontrado</p>
        )}
      </main>
    </ProtectedRoute>
  );
}
