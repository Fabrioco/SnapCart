"use client";

import { OrderType, OrderUserAddress } from "@/types/orderType";
import { UserType } from "@/types/userType";
import React, { useCallback } from "react";

export function OrderList({
  setAllOrders,
  filteredOrders,
  setFilteredOrders,
}: {
  allOrders: OrderUserAddress[];
  setAllOrders: React.Dispatch<React.SetStateAction<OrderUserAddress[]>>;
  filteredOrders: OrderUserAddress[];
  setFilteredOrders: React.Dispatch<React.SetStateAction<OrderUserAddress[]>>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const orderResponse = await fetch("http://localhost:5000/api/orders", {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
      });
      const orders = await orderResponse.json();

      const fetchOrdersWithUserAndAddress = await Promise.all(
        orders.map(async (order: OrderType) => {
          const userResponse = await fetch(`http://localhost:5000/api/users`, {
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
            credentials: "include",
          });
          const users = await userResponse.json();
          const user = users.find((user: UserType) => user.id === order.userId);

          const addressResponse = await fetch(
            `http://localhost:5000/api/addresses/${order.addressId}`,
            {
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
              credentials: "include",
            }
          );
          const address = await addressResponse.json();

          return {
            ...order,
            user,
            address,
          };
        })
      );

      setAllOrders(fetchOrdersWithUserAndAddress);
      setFilteredOrders(fetchOrdersWithUserAndAddress);
    } catch (error) {
      console.log(error);
    }
  }, [setAllOrders, setFilteredOrders]);

  React.useEffect(() => {
    fetchOrders();
  }, [setAllOrders, setFilteredOrders, fetchOrders]);

  return (
    <ul>
      {filteredOrders.map((order) => (
        <li key={order.id}>
          <div>
            <p>
              <span>Nome:</span> {order.user.name}
            </p>
            <p>
              <span>Telefone:</span> {order.user.number}
            </p>
            <p>
              <span>Endereço:</span> {order.address.street},{" "}
              {order.address.number}
            </p>
            <p>
              <span>Total:</span> R$ {order.total}
            </p>
            <button onClick={() => setIsOpen(!isOpen)}>Detalhes</button>
          </div>
          <div>
            {isOpen && (
              <div>
                <p>
                  <span>Status:</span> {order.orderStatus}
                  {order.orderStatus === "Pago" && (
                    <button>Marcar como enviado</button>
                  )}
                </p>
                <p>
                  <span></span>
                </p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
