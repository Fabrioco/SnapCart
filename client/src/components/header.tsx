import { NavHeader } from "@/ui/header/nav";
import ThemeToggle from "../ui/header/themeToggle";
import React from "react";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full flex flex-col sm:flex-row gap-4 justify-between items-center px-4 py-2 border-b border-gray-300 shadow-md">
      <h1 className="text-2xl font-semibold text-orange-500">
        <Link href="/">
          <p>SnapCart</p>
        </Link>
      </h1>
      <NavHeader />
      <ThemeToggle />
    </header>
  );
}
