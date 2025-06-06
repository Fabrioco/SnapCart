"use client";

import { OrderType } from "@/types/orderType";
import { useEffect, useState } from "react";

export function OrderSection() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [error, setError] = useState<string>("");
  const fetchOrder = async () => {
    const response = await fetch("http://localhost:5000/api/orders", {
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
    <section>
      <h2>Pedidos</h2>
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              <p>{order.id}</p>
              <p>{order.orderStatus}</p>
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
