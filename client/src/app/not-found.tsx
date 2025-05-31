"use client";
import { useRouter } from "next/navigation";
export default function NotFoundPage() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold w-fit">
        404 - Página não encontrada
      </h1>
      <p className="text-lg">A página que você procurava nao foi encontrada</p>
      <button
        onClick={() => router.push("/")}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        Ir para a página inicial
      </button>
    </main>
  );
}
