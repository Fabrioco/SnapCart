"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="bg_accessibility px-4 py-2 rounded border border-solid border-gray-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
