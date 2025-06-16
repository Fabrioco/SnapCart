# Visão Geral do Diretório `client`

O diretório `client` contém o frontend da aplicação SnapCart, uma plataforma moderna de e-commerce. Esta parte do código é construída com tecnologias de ponta para garantir uma experiência eficiente, responsiva e amigável ao usuário. Abaixo está uma explicação detalhada da estrutura e do propósito de cada subdiretório e arquivo dentro do diretório `client`.

## Estrutura de Diretórios

```
client/
├── src/
│   ├── app/                    # Páginas da aplicação usando o App Router do Next.js
│   │   ├── auth/               # Páginas de autenticação: login, registro e recuperação de senha
│   │   ├── cart/               # Funcionalidades do carrinho de compras
│   │   ├── products/           # Listagem e detalhes dos produtos
│   │   ├── admin/              # Dashboard do administrador para gerenciar produtos e pedidos
│   │   └── settings/           # Configurações do usuário e gerenciamento de perfil
│   ├── components/             # Componentes reutilizáveis da interface, como Header e Footer
│   ├── hooks/                  # Hooks personalizados do React para controle de estado e efeitos
│   ├── services/               # Serviços para requisições à API e regras de negócio
│   ├── stores/                 # Gerenciamento de estado global usando Zustand
│   ├── styles/                 # Estilos globais, principalmente configurações do TailwindCSS
│   ├── types/                  # Definições de tipos e interfaces do TypeScript
│   └── utils/                  # Funções utilitárias e auxiliares
├── public/                     # Arquivos públicos como imagens e ícones
└── package.json                # Metadados e dependências do projeto
```

## Tecnologias Principais

- **Next.js**: Framework React utilizado para renderização do lado do servidor e geração de sites estáticos, otimizando o desempenho e o SEO.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário, garantindo uma experiência dinâmica e responsiva.
- **TailwindCSS**: Framework CSS baseado em utilitários, oferecendo uma ampla gama de opções de estilização e design consistente.
- **TypeScript**: Superset do JavaScript com tipagem estática, melhorando a qualidade e a manutenção do código.
- **Zustand**: Solução leve de gerenciamento de estado, facilitando o controle de estado global na aplicação.

## Contribuição

Contribuições para o diretório `client` são bem-vindas! Se você deseja adicionar novas funcionalidades, melhorar o desempenho ou aprimorar a interface do usuário, fique à vontade para enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo LICENSE.

Criado com precisão e cuidado por Fabrício Oliveira Lopes.
