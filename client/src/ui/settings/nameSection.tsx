"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export function NameSection() {
  const { user, loading } = useCheckAuth();

  return (
    <section>
      <h1>Olá, {!loading && user.name.split(" ")[0]}! Seja bem-vindo</h1>
    </section>
  );
}
