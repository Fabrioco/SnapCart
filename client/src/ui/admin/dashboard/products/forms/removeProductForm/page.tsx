"use client";

import { ProductType } from "@/types/productType";
import { useEffect, useState } from "react";

export default function RemoveProductForm() {
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productId) {
      alert("Preencha o campo ID do produto");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao remover produto");
      }

      alert("Produto removido com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <form
      aria-labelledby="remove-product-form-title"
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 w-full h-auto"
    >
      <fieldset className="flex flex-col gap-1 px-2 text-lg">
        <legend id="remove-product-form-title" className="text-xl font-semibold">
          Remover Produto
        </legend>
        <label htmlFor="removeProductId">ID do Produto</label>
        <select
          name="removeProductId"
          id="removeProductId"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Selecione um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-orange-500 rounded text-white px-4 py-2 hover:bg-orange-600 cursor-pointer mt-8"
        >
          Remover Produto
        </button>
      </fieldset>
    </form>
  );
}

