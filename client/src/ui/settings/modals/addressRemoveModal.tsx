import { useEffect } from "react";

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
      `https://snapcart-boue.onrender.com/api/addresses/${addressId}`,
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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/25 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out flex items-center justify-center`}
    >
      <div
        className="fixed inset-0 z-20 top-4 right-4"
        onClick={() => setIsOpen(false)}
      />
      <div className="z-30 bg_accessibility_container p-4 rounded-md flex flex-col gap-2">
        <h1 className="text-lg font-semibold">
          Tem certeza que deseja remover esse endereço?
        </h1>
        <div className="flex gap-4 mt-4 justify-end">
          <button
            onClick={removeAddress}
            className="text-white bg-red-500 hover:bg-red-600 cursor-pointer rounded-md px-4 py-2"
          >
            Sim
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:underline hover:text-orange-500 cursor-pointer"
          >
            Cancelar (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
