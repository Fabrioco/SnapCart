import { ProductType } from "@/types/productType";

export const fetchAllProducts = async (): Promise<ProductType[]> => {
  const res = await fetch("https://snapcart-boue.onrender.com/api/products", {
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
  return data;
};
