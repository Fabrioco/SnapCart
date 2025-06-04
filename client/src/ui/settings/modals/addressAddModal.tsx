import { useAddressAddStore } from "@/stores/settings/addressAddStore";

export function ModalAddAddress({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const {
    cep,
    handleCepChange,
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
  } = useAddressAddStore();

  return (
    <div
      className={`fixed z-100 inset-0 bg-black/25 ${isOpen ? "" : "hidden"}`}
      id="modal"
    >
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        <h2>Adicionar endereço</h2>
        <button type="button" onClick={() => setIsOpen(false)}>
          Fechar
        </button>

        <form onSubmit={handleSubmit}>
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
            minLength={2}
            required
          />
          <input
            type="number"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            min={1}
            required
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            minLength={2}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            minLength={2}
            required
          />
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            minLength={2}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Selecione o tipo</option>
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
          </select>
          <button type="submit">Salvar Endereço</button>
        </form>
      </div>
    </div>
  );
}
