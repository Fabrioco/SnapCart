"use client";

import { useRouter } from "next/navigation";

export function LogoutSection() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
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
    <section>
      <button onClick={handleLogout}>Sair</button>
    </section>
  );
}
