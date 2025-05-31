"use client";
import { useRegisterStore } from "@/stores/registerStore";

export function RegisterForm() {
  const {
    numberPhone,
    setNumberPhone,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleRegister,
    formatPhone,
  } = useRegisterStore();

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setNumberPhone(formattedPhone);
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 bg-white text-black p-4 rounded-md border border-solid border-gray-500 shadow-lg w-11/12 lg:w-1/3"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="px-2 py-1 rounded border border-solid border-gray-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="numberPhone" className="text-lg">
          Número de telefone
        </label>
        <input
          type="text"
          id="numberPhone"
          name="numberPhone"
          onChange={handleChangePhone}
          value={numberPhone}
          className="px-2 py-1 rounded border border-solid border-gray-500"
          maxLength={15}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="px-2 py-1 rounded border border-solid border-gray-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg">
          Senha
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="px-2 py-1 rounded border border-solid border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer bg-orange-500 w-fit px-4 py-2 rounded text-white hover:bg-orange-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed mt-4"
      >
        Cadastrar
      </button>
    </form>
  );
}
