import Link from "next/link";

export function RegisterAuthLink() {
  return (
    <section className="flex flex-col gap-2 bg-white text-black p-4 rounded-md border border-solid border-gray-500 shadow-lg w-11/12 lg:w-1/3 mt-4">
      <p>
        Já possui uma conta?{" "}
        <Link
          href="/auth/login"
          className="hover:underline hover:text-orange-500"
        >
          Faça login
        </Link>
      </p>
    </section>
  );
}
