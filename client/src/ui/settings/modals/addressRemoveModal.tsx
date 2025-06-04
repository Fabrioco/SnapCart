export function AddressRemoveModal({
  isOpen,
  setIsOpen,
  addressId,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addressId: number;
}) {
  const removeAddress = async () => {
    const response = await fetch(
      `http://localhost:5000/api/addresses/${addressId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Erro ao remover endereço");
    }

    alert("Endereço removido com sucesso");
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed z-100 inset-0 bg-black/25 ${isOpen ? "" : "hidden"}`}
    >
      <div>
        <h1>Tem certeza que deseja remover esse endereço?</h1>
        <div>
          <button onClick={removeAddress}>Sim</button>
          <button onClick={() => setIsOpen(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
