"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const params = useParams();
  const token = params.token as string;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    console.log(token, password);

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/users/reset-password" + `/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      if (!res.ok) {
        console.log(res);
        throw new Error("Erro ao redefinir a senha");
      }

      alert("Senha redefinida com sucesso");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      alert("Erro ao redefinir a senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full my-4">
      <h1 className="text-2xl font-semibold w-fit">Redefinir Senha</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-4 rounded text-black border border-solid border-gray-500 shadow-lg mt-4"
      >
        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Redefinindo..." : "Redefinir Senha"}
        </button>
      </form>
    </main>
  );
}
