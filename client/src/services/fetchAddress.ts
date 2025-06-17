export const fetchAddress = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/addresses", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar endereços");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
