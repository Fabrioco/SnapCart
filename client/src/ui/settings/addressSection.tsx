import { useEffect, useState } from "react";
import { ModalAddAddress } from "./modals/addressAddModal";
import { ModalEditAddress } from "./modals/addressEditModal";
import { AddressType } from "@/types/addressType";

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
    const data = await response.json();
    setAddresses(data);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <section>
      <h2>Endereços</h2>
      <button onClick={() => setIsOpen({ ...isOpen, add: true })}>
        Adicionar endereço
      </button>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <h3>{address.street}</h3>
            <p>{address.number}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.country}</p>
            <p>{address.type}</p>
            <button onClick={() => setIsOpen({ ...isOpen, edit: true })}>
              Editar
            </button>
            <button onClick={() => setIsOpen({ ...isOpen, remove: true })}>
              Remover
            </button>
            <ModalAddAddress
              isOpen={isOpen.add}
              setIsOpen={() => setIsOpen({ ...isOpen, add: false })}
            />
            <ModalEditAddress
              isOpen={isOpen.edit}
              setIsOpen={() => setIsOpen({ ...isOpen, edit: false })}
              address={address}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
