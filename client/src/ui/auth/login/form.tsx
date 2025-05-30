"use client";

import { useLoginStore } from "@/stores/loginStore";
import { SpinnerGapIcon } from "@phosphor-icons/react";
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
    <form
      onSubmit={(e) => handleLogin(e)}
      className="flex flex-col gap-4 bg-black text-white p-4 rounded-md border border-solid border-gray-500 shadow-lg dark:border-gray-600 dark:bg-white dark:text-black w-11/12 lg:w-1/3"
    >
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
          className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
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
          className="px-2 py-1 rounded border border-solid border-gray-500 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer bg-orange-500 w-fit px-4 py-2 rounded text-white hover:bg-orange-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed mt-4"
      >
        {loading ? (
          <SpinnerGapIcon
            size={20}
            weight="bold"
            className={loading ? "animate-spin" : ""}
          />
        ) : (
          "Entrar"
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
