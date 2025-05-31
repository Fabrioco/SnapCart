import { AuthLinks } from "@/ui/auth/login/authLinks";
import { LoginForm } from "@/ui/auth/login/form";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full my-4">
      <h1 className="text-2xl font-semibold w-fit">Bem vindo de volta!</h1>
      <LoginForm />
      <AuthLinks />
    </main>
  );
}
