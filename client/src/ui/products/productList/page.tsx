import { ProductType } from "@/types/productType";
import Image from "next/image";

export function ProductListSection({
  filteredProducts,
  handleAddProductToCart,
}: {
  filteredProducts: ProductType[];
  handleAddProductToCart: (id: number, quantity: number) => void;
}) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {filteredProducts.map((product) => (
        <article
          className="max-w-sm rounded overflow-hidden shadow-lg p-4 border border-gray-200"
          key={product.id}
        >
          <Image
            src={typeof product.image === "string" ? product.image : ""}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-40 object-cover rounded"
          />
          <div className="py-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-semibold">R$ {product.price}</p>
            <div className="flex items-center mt-2">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 p-1 border border-gray-300 rounded mr-2"
                id={`quantity-${product.id}`}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 cursor-pointer"
                onClick={() =>
                  handleAddProductToCart(
                    product.id,
                    parseInt(
                      (
                        document.getElementById(
                          `quantity-${product.id}`
                        ) as HTMLInputElement
                      ).value || "1"
                    )
                  )
                }
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
