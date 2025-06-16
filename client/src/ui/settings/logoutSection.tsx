"use client";

import { useRouter } from "next/navigation";

export function LogoutSection() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("https://snapcart-boue.onrender.com/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Logout realizado com sucesso");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full flex items-center justify-center">
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600 cursor-pointer"
      >
        Sair
      </button>
    </section>
  );
}
