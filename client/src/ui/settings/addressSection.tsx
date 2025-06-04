import { useState } from "react";
import { ModalAddAddress } from "./modals/addressAddModal";

export function AddressSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section>
      <h2>Endereços</h2>
      <button onClick={() => setIsOpen(true)}>Adicionar endereço</button>
      <ul>
        <li>
          <p>Rua Exemplo, 123 - Cidade/UF</p>
          <button>Editar</button>
          <button>Remover </button>
        </li>
      </ul>
      <ModalAddAddress isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
}
