"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useCheckAuth();

  if (loading) return <p>Carregando...</p>;

  if (!user || user.role !== "admin")
    return <p>Você não tem permissão para acessar essa página.</p>;

  return <>{children}</>;
};
