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
  } = useRegisterStore();
  return (
    <form onSubmit={handleRegister}>
      <div>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label htmlFor="numberPhone">Número de telefone</label>
        <input
          type="text"
          id="numberPhone"
          name="numberPhone"
          onChange={(e) => setNumberPhone(e.target.value)}
          value={numberPhone}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
