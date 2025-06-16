import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/services/fetchAllProducts";
import { ProductType } from "@/types/productType";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, []);

  return { products, loading, error };
};
