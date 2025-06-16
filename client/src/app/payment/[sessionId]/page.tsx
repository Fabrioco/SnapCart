"use client";

import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    if (sessionId) {
      const confirmOrder = async () => {
        try {
          const response = await fetch("https://snapcart-boue.onrender.com/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ paymentId: sessionId }),
          });

          if (!response.ok) {
            console.error(await response.json());
            throw new Error("Erro ao confirmar pedido.");
          }

          const data = await response.json();
          console.log(data);
          setStatus("success");
        } catch (error) {
          console.error(error);
          setStatus("error");
        }
      };

      confirmOrder();
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      {status === "pending" && (
        <p className="text-lg font-medium">Confirmando pagamento...</p>
      )}

      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold text-green-600">
            Pagamento realizado com sucesso!
          </h1>
          <p className="mt-2 text-gray-700">Obrigado por sua compra.</p>
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            onClick={() => (window.location.href = "/")}
          >
            Ir para a página inicial
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-3xl font-bold text-red-600">Ocorreu um erro</h1>
          <p className="mt-2 text-gray-700">
            Não foi possível confirmar o pagamento.
          </p>
        </>
      )}
    </main>
  );
}
