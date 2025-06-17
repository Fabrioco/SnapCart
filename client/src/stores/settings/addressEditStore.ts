import { create } from "zustand";

interface AddressEditStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  cep: string;
  setCep: (cep: string) => void;
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
  handleSubmit: (id: number, e: React.FormEvent) => Promise<void>;
}

export const useAddressEditStore = create<AddressEditStore>((set, get) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  cep: "",
  setCep: (cep) => set({ cep }),
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
  handleSubmit: async (id, e) => {
    e.preventDefault();
    try {
      set({ loading: true });

      if (
        !get().cep &&
        !get().street &&
        !get().number &&
        !get().city &&
        !get().state &&
        !get().country &&
        !get().type
      ) {
        alert("Preencha algum campo");
        return;
      }

      const dataToUpdate: Record<string, string | number> = {};
      if (get().cep) dataToUpdate.cep = get().cep;
      if (get().street) dataToUpdate.street = get().street;
      if (get().number) dataToUpdate.number = Number(get().number);
      if (get().city) dataToUpdate.city = get().city;
      if (get().state) dataToUpdate.state = get().state;
      if (get().country) dataToUpdate.country = get().country;
      if (get().type) dataToUpdate.type = get().type;

      const res = await fetch(`http://localhost:5000/api/addresses/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar endereço", { cause: res });
      }

      alert("Endereço atualizado com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
