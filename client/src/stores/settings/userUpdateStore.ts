import { UserType } from "@/types/userType";
import { create } from "zustand";

type UserUpdateState = {
  user: UserType | null;
  loading: boolean;
  name: string;
  numberPhone: string;
  email: string;
  password: string;

  setUser: (user: UserType) => void;
  resetUser: () => void;
  setLoading: (loading: boolean) => void;
  setName: (name: string) => void;
  setNumberPhone: (numberPhone: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  formatPhone: (phone: string) => string;
  handleUpdateUser: (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => Promise<void>;
};

export const useUserUpdateStore = create<UserUpdateState>((set, get) => ({
  user: null,
  loading: false,
  name: "",
  numberPhone: "",
  email: "",
  password: "",

  setUser: (user: UserType) => set({ user }),
  resetUser: () => set({ user: null }),
  setLoading: (loading: boolean) => set({ loading }),
  setName: (name: string) => set({ name }),
  setNumberPhone: (numberPhone: string) => set({ numberPhone }),
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  formatPhone: (phone: string) => {
    return phone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  },

  handleUpdateUser: async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    if (!get().name && !get().email && !get().password) {
      alert("Preencha pelo menos um campo");
      return;
    }

    const dataToUpdate: Record<string, string> = {};
    if (get().name) dataToUpdate.name = get().name;
    if (get().numberPhone) dataToUpdate.number = get().numberPhone;
    if (get().email) dataToUpdate.email = get().email;
    if (get().password) dataToUpdate.password = get().password;

    try {
      set({ loading: true });

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar dados");
      }

      alert("Dados atualizados com sucesso");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));
