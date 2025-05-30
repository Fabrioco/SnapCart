import { LoginForm } from "@/ui/auth/login/form";

export default function LoginPage() {
  return (
    <main className="flex flex-col gap-4 w-full h-full items-center justify-center">
      <h1 className="text-2xl font-semibold">Bem vindo de volta!</h1>
      <LoginForm />
    </main>
  );
}
