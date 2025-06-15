"use client";
import { OrderUserAddress } from "@/types/orderType";
import { FormSearch } from "@/ui/admin/dashboard/orders/formSearch";
import { OrderList } from "@/ui/admin/dashboard/orders/orderList";
import React from "react";

export default function DashboardOrderPage() {
  const [filteredOrders, setFilteredOrders] = React.useState<
    OrderUserAddress[]
  >([]);
  const [allOrders, setAllOrders] = React.useState<OrderUserAddress[]>([]);

  return (
    <section
      aria-labelledby="order-management-title"
      className="flex flex-col gap-4 w-full h-full items-center justify-center"
    >
      <h1 id="order-management-title" className="text-4xl font-bold">
        Gerenciamento de Pedidos
      </h1>

      <FormSearch allOrders={allOrders} setFilteredOrders={setFilteredOrders} />

      <OrderList
        allOrders={allOrders}
        setAllOrders={setAllOrders}
        filteredOrders={filteredOrders}
        setFilteredOrders={setFilteredOrders}
      />
    </section>
  );
}
