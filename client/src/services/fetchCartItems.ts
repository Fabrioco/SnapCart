import { CartItemType } from "@/types/cartItemType";

export const fetchCartItems = async () => {
  try {
    const response = await fetch("https://snapcart-boue.onrender.com/api/cart-items", {
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
        `https://snapcart-boue.onrender.com/api/products/${item.productId}`,
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
