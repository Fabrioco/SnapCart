import { CartItemType } from "@/types/cartItemType";

export const fetchCartItems = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/cart-items", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar itens do carrinho");
    }

    const data: CartItemType[] = await response.json();
    const productsPromises = data.map(async (item) => {
      const productResponse = await fetch(
        `http://localhost:5000/api/products/${item.productId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!productResponse.ok) {
        throw new Error("Erro ao buscar produto");
      }

      const product = await productResponse.json();
      return { ...item, product };
    });

    const products = await Promise.all(productsPromises);
    return products;
  } catch (error) {
    console.error(error);
  }
};
