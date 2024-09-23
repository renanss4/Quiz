# Quiz Application

## Descrição

Este projeto é uma aplicação web de quizzes desenvolvida como parte de um trabalho acadêmico. A aplicação permite que usuários criem, editem e façam quizzes, com funcionalidades como autenticação, gerenciamento de perguntas e acompanhamento de respostas.

## Funcionalidades

- Criação de quizzes com perguntas e respostas.

- Gerenciamento de usuários e autenticação via JWT.

- Validação de dados, como campos obrigatórios e formatos de data.

- Limite de perguntas por quiz (máximo de 10 perguntas).

- CRUD completo para quizzes (Create, Read, Update, Delete).

- Relacionamento entre quizzes e matérias (subjects).

## Arquitetura da Aplicação

A aplicação segue a arquitetura MVC (Model-View-Controller), organizada de forma modular e escalável.

- **Frontend**: Desenvolvido com HTML, CSS e JavaScript, sem uso de frameworks.

- **Backend**: Construído com Node.js e Express, fornecendo uma API REST para o frontend.

- **Banco de Dados**: MongoDB, utilizado para armazenar informações de usuários, quizzes e respostas.

- **Autenticação**: Implementada com JWT (JSON Web Tokens) para garantir segurança nas sessões de usuário.

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.

- [MongoDB](https://www.mongodb.com/) instalado localmente ou acesso a um servidor MongoDB.

### Passos para Execução

1. Clone o repositório e navegue até o diretório do projeto:

   ```bash
   git clone https://github.com/renanss4/Quiz
   cd Quiz
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz da pasta `backend/` e adicione as seguintes variáveis:

   ```bash
   # SERVER
   PORT=8080

   # DATABASE
   MONGODB_URL=mongodb://127.0.0.1:27017/quiz-db

   # JWT
   JWT_SECRET=sua_chave_secreta_para_jwt
   ```

4. Execute o servidor:

   - Dentro da pasta `backend/`, execute o comando:

   ```bash
   npm start
   ```

5. Acesse a aplicação:

   Abra o navegador e vá até `http://localhost:8080`.

## Contribuições

Este projeto foi desenvolvido para adquirir experiência no desenvolvimento web completo, desde a criação de APIs até a manipulação de dados no MongoDB e implementação de autenticação JWT. Contribuições são bem-vindas!

## Implementações Futuras

- Adicionar responsividade total ao layout, garantindo que a aplicação funcione bem em dispositivos móveis.

- Adicionar testes unitários no backend para garantir a estabilidade e qualidade do código.

- Implementar o uso de um framework moderno no frontend, como React ou Vue.js, para melhorar a experiência do usuário e facilitar a manutenção.

## Licença

Este projeto é open-source e está licenciado sob a [Licença MIT](./LICENSE).
