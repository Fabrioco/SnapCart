"use client";
import ProtectedRoute from "@/routes/protectedRoute";
import { ProductType } from "@/types/productType";
import { ButtonFilterSection } from "@/ui/products/buttonFilterSection";
import { CategorySection } from "@/ui/products/categorySection";
import { ProductListSection } from "@/ui/products/productList/page";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isOpenFilterSidebar, setIsOpenFilterSidebar] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error(await res.json());
        throw new Error("Erro ao buscar produtos");
      }

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <p className="text-center">Carregando...</p>;
  }

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = filter
    ? products.filter((product) => product.category === filter)
    : products;

  const handleCategoryFilter = (category: string) => {
    setFilter(category);
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const handleAddProductToCart = async (
    productId: number,
    quantity: number
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart-items`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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
          handleCategoryFilter={handleCategoryFilter}
          handleClearFilter={handleClearFilter}
        />

        {products.length > 0 ? (
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
