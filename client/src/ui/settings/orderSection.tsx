"use client";

import { OrderType } from "@/types/orderType";
import { useEffect, useState } from "react";

export function OrderSection() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [error, setError] = useState<string>("");
  const fetchOrder = async () => {
    const response = await fetch("https://snapcart-boue.onrender.com/api/orders", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
      return;
    }

    setOrders(result);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
      <ul className="flex flex-col gap-2">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center border border-solid border-gray-500 p-2 text-lg"
            >
              <h2 className="text-xl">Pedido #{order.paymentId}</h2>
              <p>Valor pago: {order.total}</p>
              <p>Situação: {order.orderStatus}</p>
              <p>Endereço: {order.addressId}</p>
              <p>Criado em: {order.createdAt}</p>
            </li>
          ))
        ) : (
          <p>Voce não possui nenhum pedido</p>
        )}
        {error && <p>{error}</p>}
      </ul>
    </section>
  );
}
