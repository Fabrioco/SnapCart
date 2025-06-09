import { AddProductForm } from "@/ui/admin/dashboard/products/forms/addProductForm/page";
import RemoveProductForm from "@/ui/admin/dashboard/products/forms/removeUpdateForm";
import UpdateProductForm from "@/ui/admin/dashboard/products/forms/updateProductForm/page";

export default function DashboardProductsPage() {
  return (
    <section aria-labelledby="product-management-title">
      <h1 id="product-management-title">Gerenciamento de Produtos</h1>

      <AddProductForm />

      <UpdateProductForm />

      <RemoveProductForm />
    </section>
  );
}
