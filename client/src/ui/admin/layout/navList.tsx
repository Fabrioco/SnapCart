"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavList() {
  const url = usePathname();
  return (
    <nav className="flex flex-row gap-2 list-none w-11/12 justify-between items-center">
      <li>
        <Link
          href="/admin/dashboard"
          className={`relative inline-block 
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full 
    after:bg-orange-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 
    hover:after:scale-x-100
    ${url === "/admin/dashboard" ? "after:scale-x-100 text-orange-500" : ""}
  `}
        >
          Visão Geral
        </Link>
      </li>
      <li>
        <Link
          href="/admin/dashboard/products"
          className={`relative inline-block 
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full 
    after:bg-orange-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 
    hover:after:scale-x-100
    ${
      url === "/admin/dashboard/products"
        ? "after:scale-x-100 text-orange-500"
        : ""
    }
  `}
        >
          Produtos
        </Link>
      </li>
      <li>
        <Link
          href="/admin/dashboard/orders"
          className={`relative inline-block 
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full 
    after:bg-orange-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 
    hover:after:scale-x-100
    ${
      url === "/admin/dashboard/orders"
        ? "after:scale-x-100 text-orange-500"
        : ""
    }
  `}
        >
          Pedidos
        </Link>
      </li>
    </nav>
  );
}
