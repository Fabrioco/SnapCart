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

  const handleFilterOrders = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = allOrders.filter((order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  return (
    <form onSubmit={handleFilterOrders} className="w-11/12 mx-auto flex gap-2">
      <div className="flex w-full border border-solid border-gray-500 px-2 py-1 rounded focus-within:outline-none focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500 items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por nome"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="w-full focus:outline-none"
        />
        <span className="cursor-pointer">Limpar</span>
      </div>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </form>
  );
}
