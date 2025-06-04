"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import ProtectedRoute from "@/routes/protectedRoute";
import { AddressSection } from "@/ui/settings/addressSection";
import { ProfileSection } from "@/ui/settings/profileSection";
import React from "react";

export default function SettingsPage() {
  const { user, loading } = useCheckAuth();

  return (
    <ProtectedRoute>
      <main>
        <section>
          <h1>Olá, {!loading && user.name.split(" ")[0]}! Seja bem-vindo</h1>
        </section>

        <ProfileSection />

        <AddressSection />

        <section>
          <h2>Pedidos</h2>
          <ul>
            <li>
              <h3>Pedido #12345</h3>
              <p>Status: Em Andamento</p>
              <ul>
                <li>Produto 1: Quantidade 2</li>
                <li>Produto 2: Quantidade 1</li>
              </ul>
              <p>Data do Pedido: 10/10/2023</p>
              <p>Total: R$ 150,00</p>
            </li>
          </ul>
        </section>
        <section>
          <h2>Sair da Conta</h2>
          <ul>
            <li>
              <a href={`/logout`}>Sair</a>
            </li>
          </ul>
        </section>
      </main>
    </ProtectedRoute>
  );
}
