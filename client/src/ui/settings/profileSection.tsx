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
  } = useUserUpdateStore();

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhone(e.target.value);
    setNumberPhone(formattedNumber);
  };

  const { user } = useCheckAuth();

  return (
    <section>
      <h2>Perfil</h2>
      <form onSubmit={(e) => handleUpdateUser(e, user.id)}>
        <input
          type="text"
          placeholder="Nome Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
        <input
          type="text"
          placeholder="(xx) xxxxx-xxxx (apenas números)"
          id="number"
          name="number"
          value={numberPhone}
          onChange={handleChangeNumber}
          max={15}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </section>
  );
}
