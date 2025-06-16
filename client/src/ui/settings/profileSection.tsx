"use client";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useUserUpdateStore } from "@/stores/settings/userUpdateStore";

export function ProfileSection() {
  const {
    name,
    numberPhone,
    email,
    password,
    setName,
    setNumberPhone,
    setEmail,
    setPassword,
    formatPhone,
    handleUpdateUser,
    loading,
  } = useUserUpdateStore();

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhone(e.target.value);
    setNumberPhone(formattedNumber);
  };

  const { user } = useCheckAuth();

  if (!user) return null;

  return (
    <section className="flex flex-col justify-center items-start gap-4">
      <h2 className="text-2xl font-semibold">Perfil</h2>
      <form
        onSubmit={(e) => handleUpdateUser(e, user.id)}
        className="flex flex-col gap-2 w-full lg:grid lg:grid-cols-2 lg:gap-4 lg:w-1/2"
      >
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="(XX) XXXXX-XXXX (apenas números)"
          id="number"
          name="number"
          value={numberPhone}
          onChange={handleChangeNumber}
          max={15}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed lg:col-span-2 lg:w-fit lg:mr-auto"
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Atualizar"}
        </button>
      </form>
    </section>
  );
}
