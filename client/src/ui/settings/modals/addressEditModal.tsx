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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/25 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-150 ease-in-out w-full h-full flex items-center justify-center z-50 px-4`}
    >
      <div
        className="w-full fixed inset-0 h-full bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg z-50 relative text-black dark:text-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Editar endereço</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-400 dark:hover:text-gray-300"
        >
          Fechar (ESC)
        </button>

        <form
          onSubmit={(e) => handleSubmit(address.id, e)}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={handleCepChange}
            maxLength={8}
            required
            pattern="\d{5}-\d{3}"
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Rua"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <input
            type="number"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
          >
            <option value="">Selecione o tipo de endereço</option>
            <option value="residencial">Residencial</option>
            <option value="comercial">Comercial</option>
          </select>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded mt-4 hover:bg-orange-600"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
