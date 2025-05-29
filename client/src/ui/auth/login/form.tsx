"use client";

import { useLoginStore } from "@/stores/loginStore";
import React from "react";

export function LoginForm() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    loading,
    error,
  } = useLoginStore();

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      {error && <p>{error}</p>}
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
      <button type="submit">{loading ? "Entrando..." : "Entrar"}</button>
    </form>
  );
}
