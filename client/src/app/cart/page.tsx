"use client";
import { AddressType } from "@/types/addressType";
import { CartItemType, CartItemTypeWithProduct } from "@/types/cartItemType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/routes/protectedRoute";

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

export const fetchAddress = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/addresses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar endereços");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemTypeWithProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCartItems().then((data) => {
      setCartItems(data as CartItemTypeWithProduct[]);
      if (!data) {
        router.push("/products");
        return;
      }
      const totalPrice = data.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setTotalPrice(totalPrice);
    });

    fetchAddress().then((data) => {
      setAddresses(data);
    });
  }, [router]);

  const finalizePurchase = async () => {
    if (selectedAddress === null) {
      alert("Selecione um endereço de entrega");
      return;
    }

    const response = await fetch("http://localhost:5000/api/stripe/card", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addressId: selectedAddress }),
    });

    if (!response.ok) {
      console.error(await response.json());
      throw new Error("Erro ao finalizar compra");
    }

    const data = await response.json();
    window.location.href = data.url;
  };

  if (!cartItems.length) {
    return (
      <ProtectedRoute>
        <main className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Carrinho vazio
          </h1>
          <p className="text-lg text-center">Nenhum produto no carrinho.</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full "
          >
            Ver produtos
          </button>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Carrinho
        </h1>
        <section className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:flex-row sm:items-center sm:gap-8 p-4"
            >
              <Image
                src={
                  typeof item.product.image === "string"
                    ? item.product.image
                    : ""
                }
                alt={item.product.name}
                width={200}
                height={200}
                className="w-full sm:w-64 h-48 object-cover rounded-md"
              />
              <div className="flex-1 mt-4 sm:mt-0">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Produto:{" "}
                  <span className="text-gray-600">{item.product.name}</span>
                </h2>
                <p className="text-md sm:text-lg font-medium mt-2">
                  Quantidade: <span className="font-bold">{item.quantity}</span>
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="mt-6 space-y-4">
          <p className="font-medium">Escolha um endereço de entrega:</p>
          <div className="space-y-2">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-md">
                <p className="font-medium">
                  {address.street}, {address.number}
                </p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p>{address.cep}</p>
                <input
                  type="radio"
                  name="address"
                  value={address.id}
                  onChange={(e) => setSelectedAddress(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </section>
        <section className="mt-6">
          <p className="font-medium">
            Infelizmente nossa loja apenas aceita pagamento com cartão.
          </p>
        </section>
        <section className="mt-6">
          <button
            className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
            onClick={finalizePurchase}
          >
            Finalizar Compra -{" "}
            {totalPrice.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </button>
        </section>
      </main>
    </ProtectedRoute>
  );
}
