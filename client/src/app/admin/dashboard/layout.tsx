import { AdminRoute } from "@/routes/adminRoute";
import ProtectedRoute from "@/routes/protectedRoute";
import { NavList } from "@/ui/admin/layout/navList";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <AdminRoute>
        <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
          <NavList />
          {children}
        </main>
      </AdminRoute>
    </ProtectedRoute>
  );
}
