export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold w-fit">
        Seja bem-vindo! Cadastre-se
      </h1>

      <form>
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="numberPhone">Número de telefone</label>
          <input type="text" id="numberPhone" name="numberPhone" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <section>
        <p>
          Já possui uma conta?{" "}
          <a
            href="/auth/login"
            className="hover:underline hover:text-orange-500"
          >
            Faça login
          </a>
        </p>
      </section>
    </main>
  );
}
