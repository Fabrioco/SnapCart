"use client";
import { useEffect, useState } from "react";
import { ModalAddAddress } from "./modals/addressAddModal";
import { ModalEditAddress } from "./modals/addressEditModal";
import { AddressType } from "@/types/addressType";
import { AddressRemoveModal } from "./modals/addressRemoveModal";

export function AddressSection() {
  const [isOpen, setIsOpen] = useState<{
    add: boolean;
    edit: boolean;
    remove: boolean;
  }>({
    add: false,
    edit: false,
    remove: false,
  });

  const [addresses, setAddresses] = useState<AddressType[]>([]);

  const fetchAddress = async () => {
    const response = await fetch("http://localhost:5000/api/addresses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar endereço");
    }

    const data = await response.json();
    setAddresses(data);
  };

  useEffect(() => {
    fetchAddress();
  }, [isOpen]);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Endereços</h2>
      <button
        onClick={() => setIsOpen({ ...isOpen, add: true })}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-fit"
      >
        Adicionar endereço
      </button>
      <ul className="flex flex-col gap-2">
        {addresses.map((address) => (
          <li
            key={address.id}
            className="flex flex-col gap-2 border border-gray-300 px-8 py-4 rounded-lg"
          >
            <p>
              {address.street}, {address.number} - {address.city}/
              {address.state} - {address.country}, {address.type}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen({ ...isOpen, edit: true })}
                className="text-blue-600 cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => setIsOpen({ ...isOpen, remove: true })}
                className="text-red-600 cursor-pointer"
              >
                Remover
              </button>
            </div>
            <ModalEditAddress
              isOpen={isOpen.edit}
              setIsOpen={() => setIsOpen({ ...isOpen, edit: false })}
              address={address}
            />
            <AddressRemoveModal
              isOpen={isOpen.remove}
              setIsOpen={() => setIsOpen({ ...isOpen, remove: false })}
              addressId={address.id}
            />
          </li>
        ))}
        <ModalAddAddress
          isOpen={isOpen.add}
          setIsOpen={() => setIsOpen({ ...isOpen, add: false })}
        />
      </ul>
    </section>
  );
}
