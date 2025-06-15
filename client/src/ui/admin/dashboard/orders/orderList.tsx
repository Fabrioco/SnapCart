"use client";

import { OrderType, OrderUserAddress } from "@/types/orderType";
import { ProductType } from "@/types/productType";
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
          const userResponse = await fetch(
            `http://localhost:5000/api/users/${order.userId}`,
            {
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
              credentials: "include",
            }
          );
          const user = await userResponse.json();

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

          const productsResponse = await fetch(
            `http://localhost:5000/api/products`,
            {
              cache: "no-cache",
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
              credentials: "include",
            }
          );
          const allProducts = await productsResponse.json();

          const products = allProducts.filter((product: ProductType) =>
            order.items.map((item) => item.productId).includes(product.id)
          );

          return {
            ...order,
            user,
            address,
            products,
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
    <ul className="flex flex-col gap-4 w-11/12 items-center justify-center mx-auto">
      {filteredOrders.map((order) => (
        <li
          key={order.id}
          className="w-full border border-solid border-gray-500 rounded-md p-4 mb-4 text-lg gap-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full relative">
            <p>
              <span className="font-semibold">Nome:</span> {order.user.name}
            </p>
            <p>
              <span className="font-semibold">Telefone:</span>{" "}
              {order.user.number}
            </p>
            <p>
              <span className="font-semibold">Endereço:</span>{" "}
              {order.address.street}, {order.address.number}
            </p>
            <p>
              <span className="font-semibold">Total:</span> R$ {order.total}
            </p>

            <p>
              <span className="font-semibold">Data:</span>{" "}
              {order.createdAt.slice(0, 10).split("-").reverse().join("/")}
            </p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="font-semibold text-white bg-orange-500 py-2 px-4 rounded hover:bg-orange-600 hover:shadow-lg cursor-pointer"
            >
              {isOpen ? "Fechar" : "Abrir"}
            </button>
          </div>
          {isOpen && (
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row md:gap-2 items-start md:items-center">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {order.orderStatus}
                </p>
                {order.orderStatus === "Pago" && (
                  <button className="font-semibold text-white bg-green-500 py-2 px-4 rounded hover:bg-green-600 hover:shadow-lg cursor-pointer">
                    Marcar como enviado
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                {order.products &&
                  order.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-2"
                    >
                      <p>
                        <span className="font-semibold">Produto:</span>{" "}
                        {product.name}
                      </p>
                      <p>
                        <span className="font-semibold">Preço:</span> R$
                        {product.price}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
