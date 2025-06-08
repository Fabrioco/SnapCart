"use client";
import { ProductType } from "@/types/productType";
import { useEffect, useState } from "react";

export default function UpdateProductForm() {
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const [products, setProducts] = useState<ProductType[]>([]);

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

  const handleFetchProduct = async (id: number) => {
    if (id === 0) {
      setProduct({
        id: 0,
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
      });
      return;
    }
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar produto");
    }
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    handleFetchProduct(product.id);
  }, [product.id]);

  const handleUpdateProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const dataToUpdate: Record<string, string | File | number> = {};
    if (product.name) dataToUpdate.name = product.name;
    if (product.description) dataToUpdate.description = product.description;
    if (product.price) dataToUpdate.price = product.price;
    if (product.category) dataToUpdate.category = product.category;
    if (product.image) dataToUpdate.image = product.image;

    const res = await fetch(
      `http://localhost:5000/api/products/${product.id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      }
    );

    console.log(res);
    console.log(await res.json());
    if (!res.ok) {
      throw new Error("Erro ao atualizar produto");
    }

    alert("Produto atualizado com sucesso");
  };

  console.log(product);

  return (
    <form
      aria-labelledby="update-product-form-title"
      onSubmit={handleUpdateProduct}
    >
      <fieldset>
        <legend id="update-product-form-title">Atualizar Produto</legend>
        <label htmlFor="updateProductId">ID do Produto</label>
        <select
          onChange={(e) =>
            setProduct({ ...product, id: Number(e.target.value) })
          }
          value={product.id}
        >
          <option value="">Selecione o produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.id})
            </option>
          ))}
        </select>

        <label htmlFor="updateProductName">Novo Nome do Produto</label>
        <input
          type="text"
          id="updateProductName"
          name="updateProductName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <label htmlFor="updateProductDescription">
          Nova Descrição do Produto
        </label>
        <textarea
          id="updateProductDescription"
          name="updateProductDescription"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        ></textarea>

        <label htmlFor="updateProductPrice">Novo Preço do Produto</label>
        <input
          type="number"
          id="updateProductPrice"
          name="updateProductPrice"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />

        <label htmlFor="updateProductCategory">Nova Categoria do Produto</label>
        <input
          type="text"
          id="updateProductCategory"
          name="updateProductCategory"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />

        <label htmlFor="updateProductImage">Nova Imagem do Produto</label>
        <input
          type="file"
          id="updateProductImage"
          name="updateProductImage"
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />

        <button type="submit">Atualizar Produto</button>
      </fieldset>
    </form>
  );
}
