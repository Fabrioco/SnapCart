import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterState = {
  name: string;
  numberPhone: string;
  email: string;
  password: string;
  loading: boolean;
  error: string;
  clearCredentials: () => void;
  setName: (name: string) => void;
  setNumberPhone: (numberPhone: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  validateFields: () => boolean;
  formatPhone: (phone: string) => string;
};

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set, get) => ({
      name: "",
      numberPhone: "",
      email: "",
      password: "",
      loading: false,
      error: "",
      clearCredentials: () => {
        set({ name: "", email: "", password: "" });
      },
      setName: (name: string) => set({ name }),
      setNumberPhone: (numberPhone: string) => set({ numberPhone }),
      setEmail: (email: string) => set({ email }),
      setPassword: (password: string) => set({ password }),
      handleRegister: async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validate = get().validateFields();
        if (!validate) {
          return;
        }

        try {
          set({ loading: true, error: "" });

          const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: get().name,
              number: get().numberPhone,
              email: get().email,
              password: get().password,
            }),
          });

          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error(error);
          set({ error: "Erro ao criar usuário" });
        } finally {
          set({ loading: false });
        }
      },
      validateFields: () => {
        const { name, email, password } = get();
        if (!name || !email || !password) {
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
      formatPhone: (phone: string) => {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      },
    }),
    {
      name: "register-store",
    }
  )
);
