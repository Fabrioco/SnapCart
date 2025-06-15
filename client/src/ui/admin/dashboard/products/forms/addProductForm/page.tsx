"use client";

import { ProductType } from "@/types/productType";
import { useEffect, useState } from "react";

export function AddProductForm() {
  const [categories, setCategories] = useState<string[]>([]);
  const [product, setProduct] = useState<Omit<ProductType, "id">>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    const data = await res.json();
    setCategories(data.map((product: ProductType) => product.category));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.category ||
      !product.image
    ) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      if (typeof product.image === "object") {
        const imageBase64 = await base64(product.image);
        product.image = imageBase64 as string;
      }

      const priceFormatted = product.price.toString().replace(",", ".");
      product.price = Number(priceFormatted);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        throw new Error("Erro ao adicionar produto");
      }

      const data = await res.json();
      if (data) {
        alert("Produto adicionado com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const base64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form
      aria-labelledby="add-product-form-title"
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 w-full h-auto"
    >
      <fieldset className="flex flex-col gap-1 px-2 text-lg">
        <legend id="add-product-form-title" className="text-xl font-semibold">
          Adicionar Produto
        </legend>
        <label htmlFor="productName">Nome do Produto</label>
        <input
          type="text"
          id="productName"
          name="productName"
          required
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <label htmlFor="productDescription">Descrição do Produto</label>
        <textarea
          id="productDescription"
          name="productDescription"
          required
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>

        <label htmlFor="productCategory">Categoria</label>
        <input
          type="text"
          id="productCategory"
          name="productCategory"
          required
          list="categories"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <datalist id="categories">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>

        <label htmlFor="productPrice">Preço</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          required
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) })
          }
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <label htmlFor="productImage">Imagem</label>
        <input
          type="file"
          id="productImage"
          name="productImage"
          required
          accept="image/*"
          onChange={(e) =>
            setProduct({ ...product, image: e.target.files![0] })
          }
          className="px-2 py-1 rounded border border-solid border-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="bg-orange-500 rounded text-white px-4 py-2 hover:bg-orange-600 cursor-pointer mt-8"
        >
          Adicionar Produto
        </button>
      </fieldset>
    </form>
  );
}
