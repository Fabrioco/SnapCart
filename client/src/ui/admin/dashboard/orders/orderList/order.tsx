import { OrderUserAddress } from "@/types/orderType";

export function OrderDetails({
  order,
  isOpen,
  setIsOpen,
}: {
  order: OrderUserAddress;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const updateToSendProduct = async () => {
    try {
      const res = await fetch(`https://snapcart-boue.onrender.com/api/orders/${order.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: order.id,
          status: "Enviado",
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  return (
    <li
      key={order.id}
      className="w-full border border-solid border-gray-500 rounded-md p-4 mb-4 text-lg gap-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full relative">
        <p>
          <span className="font-semibold">Nome:</span> {order.user.name}
        </p>
        <p>
          <span className="font-semibold">Telefone:</span> {order.user.number}
        </p>
        <p>
          <span className="font-semibold">Endereço:</span>{" "}
          {order.address.street}, {order.address.number}
        </p>
        <p>
          <span className="font-semibold">Total:</span> R$ {order.total}
        </p>

        <p>
          <span className="font-semibold">Data:</span>{" "}
          {order.createdAt.slice(0, 10).split("-").reverse().join("/")}
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold text-white bg-orange-500 py-2 px-4 rounded hover:bg-orange-600 hover:shadow-lg cursor-pointer"
        >
          {isOpen ? "Fechar" : "Abrir"}
        </button>
      </div>

      {isOpen && (
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex flex-col md:flex-row md:gap-2 items-start md:items-center">
            <p>
              <span className="font-semibold">Status:</span> {order.orderStatus}
            </p>
            {order.orderStatus === "Pago" && (
              <button
                onClick={updateToSendProduct}
                className="font-semibold text-white bg-green-500 py-2 px-4 rounded hover:bg-green-600 hover:shadow-lg cursor-pointer"
              >
                Marcar como enviado
              </button>
            )}
          </div>

          <div className="flex flex-col">
            {order.products &&
              order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-2"
                >
                  <p>
                    <span className="font-semibold">Produto:</span>{" "}
                    {product.name}
                  </p>
                  <p>
                    <span className="font-semibold">Preço:</span> R$
                    {product.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </li>
  );
}
