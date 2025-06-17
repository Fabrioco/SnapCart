export const handleAddProductToCart = async (
  productId: number,
  quantity: number
) => {
  try {
    const res = await fetch(`http://localhost:5000/api/cart-items`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      alert("Erro ao adicionar produto ao carrinho");
      return;
    }

    alert("Produto adicionado ao carrinho");
  } catch (error) {
    console.error(error);
  }
};
