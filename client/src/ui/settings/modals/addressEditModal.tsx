import { useAddressEditStore } from "@/stores/settings/addressEditStore";
import { AddressType } from "@/types/addressType";
import { useEffect } from "react";

export function ModalEditAddress({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  address: AddressType;
}) {
  const {
    cep,
    setCep,
    street,
    setStreet,
    number,
    setNumber,
    city,
    setCity,
    state,
    setState,
    country,
    setCountry,
    type,
    setType,
    handleSubmit,
  } = useAddressEditStore();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/(\d{5})(\d{3})/, "$1-$2");
    setCep(formattedValue);
  };

  useEffect(() => {
    setCep(address.cep);
    setStreet(address.street);
    setNumber(String(address.number));
    setCity(address.city);
    setState(address.state);
    setCountry(address.country);
    setType(address.type);
  }, [
    address.cep,
    address.street,
    address.number,
    address.city,
    address.state,
    address.country,
    address.type,
    setCep,
    setStreet,
    setNumber,
    setCity,
    setState,
    setCountry,
    setType,
  ]);

  return (
    <div
      className={`fixed z-100 inset-0 bg-black/25 ${isOpen ? "" : "hidden"}`}
      id="modal"
    >
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        <h2>Editar endereço</h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          Fechar
        </button>

        <form onSubmit={(e) => handleSubmit(address.id,e)}>
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={handleCepChange}
            maxLength={8}
            required
          />
          <input
            type="text"
            placeholder="Rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione o tipo de endereço</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
