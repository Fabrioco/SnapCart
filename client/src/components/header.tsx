import { NavHeader } from "@/ui/header/nav";
import ThemeToggle from "../ui/header/themeToggle";
import React from "react";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 border-b border-gray-300 shadow-md">
      <h1 className="text-2xl font-semibold text-orange-500">SnapCart</h1>
      <NavHeader />
      <ThemeToggle />
    </header>
  );
}
