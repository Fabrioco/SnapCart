"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Link from "next/link";

export function NavHeader() {
  const { user, loading } = useCheckAuth();

  return (
    <nav>
      <ul className="flex gap-4">
        <li className="hover:text-orange-500">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-orange-500">
          <Link href="/cart">Carrinho</Link>
        </li>
        <li className="hover:text-orange-500">
          <Link href="/products">Produtos</Link>
        </li>
        {!loading && user ? (
          <>
            <li className="hover:text-orange-500">
              <Link href="/settings">Configuração</Link>
            </li>
            {user.role === "admin" && (
              <li className="hover:text-orange-500">
                <Link href="/admin/dashboard">Admin</Link>
              </li>
            )}
          </>
        ) : (
          <li className="hover:text-orange-500">
            <Link href="/auth/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
