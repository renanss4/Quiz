import express from "express"; // Importa o framework Express para criar o servidor web
import bodyParser from "body-parser"; // Importa o body-parser para fazer o parsing do corpo das requisições
import cors from "cors"; // Importa o CORS para permitir requisições de diferentes origens
import { config } from "dotenv"; // Importa o dotenv para carregar variáveis de ambiente a partir de um arquivo .env
import { connectToDatabase } from "./database/connect.js"; // Importa a função de conexão com o banco de dados
import { rota } from "./routes/routes.js";

// Carrega as variáveis de ambiente do arquivo .env
config();

// Conecta com o Banco de Dados
connectToDatabase();

const server = express(); // Cria uma instância do servidor Express

server.use(bodyParser.json()); // Configura o body-parser para parsear o corpo das requisições como JSON
server.use(cors()); // Habilita o CORS para permitir requisições de outras origens
server.use("/", rota);

const port = process.env.PORT || 8080; // Define a porta em que o servidor vai rodar, utilizando a porta definida nas variáveis de ambiente ou 8080 como padrão

// Inicia o servidor na porta definida
server.listen(port, () => {
  console.log(`Rodando na porta ${port}!`); // Loga uma mensagem indicando que o servidor está rodando
  console.log(`Abra no seu navegador: http://127.0.0.1:${port}`); // Loga a URL onde o servidor pode ser acessado
});
