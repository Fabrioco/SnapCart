# SnapCart 🛒

**SnapCart** é um e-commerce full‑stack moderno, construído com **Next.js**, **TailwindCSS**, **Prisma** e **PostgreSQL** (via Docker Compose). Oferece funcionalidades como autenticação, gerenciamento de produtos, carrinho de compras, página de checkout com **Stripe**, e dashboard admin.

---

## 🚀 Tecnologias Usadas

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS
- **Backend**: API REST com Next.js API Routes
- **Banco de dados**: PostgreSQL (Docker Compose) + Prisma ORM
- **Autenticação**: JWT/Cookies (com endpoints como `/api/users/login`)
- **Pagamentos**: Stripe (checkout com `session_id`)
- **Estado global**: Zustand (para login e carrinho)
- **Email**: Nodemailer + Gmail Apps Password (`dotenv`)
- **Deploy local**: `docker-compose up` + `npm run dev`

---

## 🔧 Funcionalidades

- 🧑‍💻 Registro, login e persistência de sessão
- 📝 Dashboard Admin (permite cadastrar/editar produtos)
- 🛍️ Lista de produtos, filtro por categoria
- 🛒 Carrinho de compras com total calculado
- 💳 Checkout com Stripe + redirecionamento `session_id`
- 📧 E-mails via Nodemailer (confirmação de pedido ou login)
- ⚙️ Tema claro/escuro com toggle persistido

---

## ▶️ Como rodar o projeto localmente

### Pré-requisitos:

- Node.js (>= 18)
- Docker & Docker Compose

### Passos:

```bash
# 1. Clone o projeto
git clone https://github.com/Fabrioco/SnapCart.git
cd SnapCart

# 2. Copie as variáveis de ambiente
cp .env.example .env

# 3. Ajuste o DATABASE_URL no .env:
#    - Se rodando backend local: use localhost:5433
#    - Se backend no Docker: use host = db, porta interna = 5432

# 4. Inicie o banco e aplique migrations:
docker-compose up -d
npx prisma migrate dev --name init

# 5. Gere o client do Prisma:
npx prisma generate

# 6. Instale dependências e inicie o servidor:
npm install
npm run dev
```

Abra o frontend em http://localhost:3000.

## 🧩 Estrutura de Pastas

```
.
├── app/                   # Páginas com App Router
│   ├── auth/              # Login, registro, forgot password
│   ├── cart/, products/, admin/...
├── components/            # Header, Footer e UI comuns
├── hooks/                 # useCheckAuth, custom hooks
├── services/              # cartService, userService, email, stripe
├── stores/                # Zustand stores
├── prisma/                # Schema, migrations
├── public/                # Imagens, favicon.ico
└── docker-compose.yml     # Banco PostgreSQL local
```

## 📄 Endpoints/API

- POST /api/users/login — login com email e senha
- GET /api/user — retorna dados do usuário logado (cookies)
- GET /api/products — lista produtos
- POST /api/cart-items, GET /api/cart-items — gerencia itens do carrinho
- POST /api/stripe/create-checkout — inicia checkout no Stripe
- GET /api/orders — confirma pedido após checkout via session_id

## 🎯 Próximos Passos

- Definir roles e proteção de rotas admin
- Adicionar testes (jest + React Testing Library)
- Deploy (Vercel para Front e Docker no backend)
- Exportar PDF de contrato ou pedido
- E-mail transacionais (envio de recibo)

## 📧 Contato

- Desenvolvedor: Fabrício Oliveira Lopes
- Email: seu-email@provedor.com
- GitHub: https://github.com/Fabrioco
- SPDX-License-Identifier: MIT

## 📝 Como usar

- Ajuste o .env (banco, Gmail, Stripe keys)
- Suba os containers e o servidor localmente
- Explore o site: registro/login → produtos → carrinho → checkout via Stripe

## ✅ Contribuições

Pull requests são bem-vindas! Quer expandir a funcionalidade? Adicione testes, otimize performance, implemente CI/CD ou melhore o design.

## 🔗 Referências

- 🛠 Next.js App Router
- 🛠 Zustand (estado global)
- 🛠 Stripe Checkout
- 🛠 Prisma & Docker Compose
- 🛠 Nodemailer + Gmail App Password
- 🛠 TailwindCSS + responsividade

Feito com ☕️ por Fabrício
