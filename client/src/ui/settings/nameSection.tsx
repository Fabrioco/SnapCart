"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export function NameSection() {
  const { user, loading } = useCheckAuth();

  if (!user) return null;
  return (
    <section>
      <h1 className="text-4xl border-b border-gray-300 w-fit">
        Olá,{" "}
        <strong className="text-orange-500">
          {!loading && user.name.split(" ")[0]}!
        </strong>{" "}
        Seja bem-vindo!
      </h1>
    </section>
  );
}
