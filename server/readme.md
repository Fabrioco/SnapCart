# API - E-commerce

## Sobre

Essa API foi construída com o intuito de simular uma loja virtual, onde os usuários podem criar contas, adicionar produtos ao carrinho, realizar compras e muito mais.

## Funcionalidades

- [x] Criar conta
- [x] Realizar login
- [x] Adicionar produtos ao carrinho
- [x] Realizar compras
- [x] Gerenciar endereços
- [x] Gerenciar favoritos
- [x] Listar produtos
- [x] Listar pedidos
- [x] Listar favoritos
- [x] Realizar pagamento com cartão de crédito (via Stripe)

## Tecnologias utilizadas

- [x] Node.js
- [x] Express
- [x] Prisma
- [x] PostgreSQL
- [x] Stripe

## Instalação

Para instalar a API, basta clonar o repositório e executar o comando `npm install`.

## Uso

Para usar a API, basta executar o comando `npm start` e acessar a url `http://localhost:3000/api` em seu navegador.

## Rotas

Abaixo estão listadas as rotas da API:

### Users

- **POST /users**: Cria um novo usuário.
- **GET /users**: Retorna uma lista de todos os usuários.
- **GET /users/:id**: Retorna um usuário específico.
- **PATCH /users/:id**: Atualiza um usuário específico.
- **DELETE /users/:id**: Deleta um usuário específico.

### Products

- **GET /products**: Retorna uma lista de todos os produtos.
- **GET /products/:id**: Retorna um produto específico.

### Cart Items

- **POST /cart-items**: Adiciona um produto ao carrinho de um usuário.
- **GET /cart-items**: Retorna uma lista de todos os produtos no carrinho de um usuário.
- **DELETE /cart-items/:id**: Remove um produto do carrinho de um usuário.

### Orders

- **POST /orders**: Realiza uma compra.
- **GET /orders**: Retorna uma lista de todas as compras de um usuário.
- **GET /orders/:id**: Retorna uma compra específica de um usuário.

### Favorites

- **POST /favorites**: Adiciona um produto aos favoritos de um usuário.
- **GET /favorites**: Retorna uma lista de todos os produtos favoritos de um usuário.
- **DELETE /favorites/:id**: Remove um produto dos favoritos de um usuário.

### Addresses

- **POST /addresses**: Cria um novo endereço para um usuário.
- **GET /addresses**: Retorna uma lista de todos os endereços de um usuário.
- **GET /addresses/:id**: Retorna um endereço específico de um usuário.
- **PATCH /addresses/:id**: Atualiza um endereço específico de um usuário.
- **DELETE /addresses/:id**: Deleta um endereço específico de um usuário.

### Payments

- **POST /payments**: Realiza um pagamento com cartão de crédito (via Stripe).

## Contribuição

A contribuição para o desenvolvimento da API é bem-vinda! Para contribuir, basta clonar o repositório e criar um pull request com as alterações.

## Licença

Essa API é licenciada sob a licença MIT. Para mais informações, por favor, veja o arquivo [LICENSE](LICENSE).
