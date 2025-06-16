"use client";
import React from "react";
import emailjs from "emailjs-com";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Insira um email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://snapcart-boue.onrender.com/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao enviar email");
      }

      const token = await res.json();
      const { access_token } = token;

      const link = `http://localhost:3000/auth/reset-password/${access_token}`;

      await emailjs.send(
        "service_2e749ze",
        "template_5gyhnyg",
        {
          email,
          link,
        },
        "-eUU547gayx2RbzsH"
      );

      alert("Email enviado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full my-4">
      <h1 className="text-2xl font-semibold w-fit">Recuperar senha</h1>
      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col gap-4 bg-white text-black p-4 rounded-md border border-solid border-gray-500 shadow-lg w-11/12 lg:w-1/3"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email"
            className="px-2 py-1 rounded border border-solid border-gray-500 focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
