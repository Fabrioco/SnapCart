"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import ProtectedRoute from "@/routes/protectedRoute";
import { AddressSection } from "@/ui/settings/addressSection";
import { LogoutSection } from "@/ui/settings/logoutSection";
import { OrderSection } from "@/ui/settings/orderSection";
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

        <OrderSection />

        <LogoutSection />
      </main>
    </ProtectedRoute>
  );
}
