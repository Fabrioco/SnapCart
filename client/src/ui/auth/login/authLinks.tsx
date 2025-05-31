import Link from "next/link";

export function AuthLinks() {
    return (
        <section className="flex flex-col gap-2 bg-white text-black p-4 rounded-md border border-solid border-gray-500 shadow-lg w-11/12 lg:w-1/3 mt-4">
        <p className="text-sm">
          Ainda não tem uma conta?{" "}
          <Link
            href="/auth/register"
            className="hover:underline hover:text-orange-500"
          >
            Cadastrar-se
          </Link>
        </p>
        <p className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="hover:underline hover:text-orange-500"
          >
            Esqueceu sua senha?
          </Link>
        </p>
      </section>
    )
}