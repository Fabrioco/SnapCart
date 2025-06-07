import { create } from "zustand";

type AddressAddStore = {
  cep: string;
  setcep: (cep: string) => void;
  street: string;
  setStreet: (street: string) => void;
  number: string;
  setNumber: (number: string) => void;
  city: string;
  setCity: (city: string) => void;
  state: string;
  setState: (state: string) => void;
  country: string;
  setCountry: (country: string) => void;
  type: string;
  setType: (type: string) => void;
  handleCepChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

export const useAddressAddStore = create<AddressAddStore>((set, get) => ({
  cep: "",
  setcep: (cep) => set({ cep }),
  street: "",
  setStreet: (street) => set({ street }),
  number: "",
  setNumber: (number) => set({ number }),
  city: "",
  setCity: (city) => set({ city }),
  state: "",
  setState: (state) => set({ state }),
  country: "Brasil",
  setCountry: (country) => set({ country }),
  type: "",
  setType: (type) => set({ type }),

  handleCepChange: async (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/(\d{5})(\d{3})/, "$1-$2");
    get().setcep(formattedValue);

    if (rawValue.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawValue}/json/`);
        const data = await res.json();

        if (!data.erro) {
          get().setStreet(data.logradouro || "");
          get().setCity(data.localidade || "");
          get().setState(data.uf || "");
        } else {
          alert("CEP não encontrado");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  },

  handleSubmit: async (e) => {
    e.preventDefault();

    if (
      !get().cep ||
      !get().street ||
      !get().number ||
      !get().city ||
      !get().state ||
      !get().country ||
      !get().type
    ) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cep: get().cep,
          street: get().street,
          number: Number(get().number),
          city: get().city,
          state: get().state,
          country: get().country,
          type: get().type,
        }),
      });

      if (!res.ok) {
        alert("Erro ao cadastrar endereço");
        return;
      }

      alert("Endereço cadastrado com sucesso");
    } catch (err) {
      console.error("Erro ao cadastrar endereço:", err);
    }
  },
}));
