import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  clearCredentials: () => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  validateFields: () => boolean;
  error: string;
}

export const useLoginStore = create<LoginState>()(
  persist(
    (set, get) => ({
      email: "",
      password: "",
      loading: false,
      error: "",

      setEmail: (email: string) => set({ email }),
      setPassword: (password: string) => set({ password }),

      clearCredentials: () => {
        set({ email: "", password: "" });
      },

      validateFields: () => {
        const { email, password } = get();
        if (!email || !password) {
          set({ error: "Preencha todos os campos" });
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          set({ error: "Email inválido" });
          return false;
        }
        set({ error: "" });
        return true;
      },

      handleLogin: async (e: React.FormEvent) => {
        e.preventDefault();
        const validate = get().validateFields();
        if (!validate) {
          return;
        }

        try {
          set({ loading: true, error: "" });

          const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                email: get().email,
                password: get().password,
              }),
            }
          );

          const result = await response.json();

          if (result.error) {
            set({ error: result.error });
            return;
          }

          window.location.href = "/";
        } catch (error) {
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "login-store",
      partialize: (state) => ({
        email: state.email,
        password: state.password,
      }),
    }
  )
);
