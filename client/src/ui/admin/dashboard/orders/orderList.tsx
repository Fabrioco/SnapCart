"use client";

import { OrderType, OrderUserAddress } from "@/types/orderType";
import { ProductType } from "@/types/productType";
import React, { useCallback } from "react";
import { OrderDetails } from "./orderList/order";

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
        <OrderDetails
          key={order.id}
          order={order}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ))}
    </ul>
  );
}
