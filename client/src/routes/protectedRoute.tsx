"use client";

import { useCheckAuth } from "@/hooks/useCheckAuth";
import { SpinnerGapIcon } from "@phosphor-icons/react";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, user } = useCheckAuth();

  if (loading) {
    return (
      <p className="text-center flex items-center gap-4">
        Buscando dados
        <SpinnerGapIcon size={32} weight="bold" className="animate-spin" />
      </p>
    );
  }

  if (!user.id) {
    return null;
  }

  return <>{children}</>;
}
