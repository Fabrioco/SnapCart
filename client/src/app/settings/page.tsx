import ProtectedRoute from "@/routes/protectedRoute";
import { AddressSection } from "@/ui/settings/addressSection";
import { LogoutSection } from "@/ui/settings/logoutSection";
import { NameSection } from "@/ui/settings/nameSection";
import { OrderSection } from "@/ui/settings/orderSection";
import { ProfileSection } from "@/ui/settings/profileSection";
import React from "react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <main className="w-full px-4 py-2 mt-10 flex flex-col gap-4">
        <NameSection />

        <ProfileSection />

        <AddressSection />

        <OrderSection />

        <LogoutSection />
      </main>
    </ProtectedRoute>
  );
}
