"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Link from "next/link";

export function NavHeader() {
  const { user } = useCheckAuth();
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
        </li>
        <li>
          <Link href="/cart" className="hover:text-orange-500">
            Carrinho
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-orange-500">
            Produtos
          </Link>
        </li>
        <li>
          <Link href="/settings" className="hover:text-orange-500">
            Configuração
          </Link>
        </li>
        {user.role === "admin" && (
          <li>
            <Link href="/admin/dashboard" className="hover:text-orange-500">
              Admin
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
