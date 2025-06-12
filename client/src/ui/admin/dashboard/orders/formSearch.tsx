"use client";

import { OrderUserAddress } from "@/types/orderType";
import React from "react";

export function FormSearch({
  allOrders,
  setFilteredOrders,
}: {
  allOrders: OrderUserAddress[];
  setFilteredOrders: React.Dispatch<React.SetStateAction<OrderUserAddress[]>>;
}) {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleFilterOrders = () => {
    const filtered = allOrders.filter((order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <form onSubmit={handleFilterOrders}>
      <input
        type="text"
        placeholder="Buscar por nome"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
