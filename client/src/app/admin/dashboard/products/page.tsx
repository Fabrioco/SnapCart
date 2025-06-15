import { AddProductForm } from "@/ui/admin/dashboard/products/forms/addProductForm/page";
import RemoveProductForm from "@/ui/admin/dashboard/products/forms/removeProductForm/page";
import UpdateProductForm from "@/ui/admin/dashboard/products/forms/updateProductForm/page";

export default function DashboardProductsPage() {
  return (
    <section
      aria-labelledby="product-management-title"
      className="flex flex-col gap-4 w-full h-full items-center justify-center"
    >
      <h1
        id="product-management-title"
        className="text-4xl font-bold text-orange-500"
      >
        Gerenciamento de Produtos
      </h1>

      <AddProductForm />

      <UpdateProductForm />

      <RemoveProductForm />
    </section>
  );
}
