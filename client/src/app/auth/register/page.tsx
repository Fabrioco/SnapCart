import { RegisterAuthLink } from "@/ui/auth/register/authLinks";
import { RegisterForm } from "@/ui/auth/register/form";

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold w-fit">
        Seja bem-vindo! Cadastre-se
      </h1>
      <RegisterForm />
      <RegisterAuthLink />
    </main>
  );
}
