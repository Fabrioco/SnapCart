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
      <main>
        <NameSection />

        <ProfileSection />

        <AddressSection />

        <OrderSection />

        <LogoutSection />
      </main>
    </ProtectedRoute>
  );
}
