import express from "express"; // Importa o framework Express para criar o servidor web
import bodyParser from "body-parser"; // Importa o body-parser para fazer o parsing do corpo das requisições
import cors from "cors"; // Importa o CORS para permitir requisições de diferentes origens
import { config } from "dotenv"; // Importa o dotenv para carregar variáveis de ambiente a partir de um arquivo .env
import { connectToDatabase } from "./src/database/connect.js"; // Importa a função de conexão com o banco de dados
import { UserModel } from "./src/models/usuario.model.js"; // Importa o modelo de usuário do banco de dados

// Carrega as variáveis de ambiente do arquivo .env
config();

// Conecta com o Banco de Dados
connectToDatabase();

const port = process.env.PORT || 8080; // Define a porta em que o servidor vai rodar, utilizando a porta definida nas variáveis de ambiente ou 8080 como padrão
const server = express(); // Cria uma instância do servidor Express

server.use(cors()); // Habilita o CORS para permitir requisições de outras origens
server.use(bodyParser.json()); // Configura o body-parser para parsear o corpo das requisições como JSON

// USUARIOS

// Define a rota GET para obter a lista de usuários
server.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await UserModel.find({}); // Busca todos os usuários no banco de dados
    return res.status(200).json(usuarios); // Retorna a lista de usuários com status 200 (OK)
  } catch (err) {
    return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
  }
});

// Define a rota POST para criar um novo usuário
server.post("/usuarios", async (req, res) => {
  try {
    const usuario = await UserModel.create(req.body); // Cria um novo usuário com os dados enviados no corpo da requisição
    return res.status(201).send(`Usuário ${usuario.nome} adicionado!`); // Retorna uma mensagem de sucesso com status 201 (Criado)
  } catch (err) {
    return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
  }
});

// PATCH: Atualiza um usuário existente
server.patch("/usuarios/:id", async (req, res) => {
  // Define a rota PATCH para atualizar um usuário existente
  try {
    // Inicia um bloco de código try para lidar com possíveis erros
    const id = req.params.id; // Obtém o ID do usuário a ser atualizado a partir dos parâmetros da requisição

    // Encontra e atualiza o usuário com o ID especificado, usando os dados do corpo da requisição
    const usuario = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true, // Retorna o novo documento atualizado
    });

    return res.status(200).json(usuario); // Retorna o usuário atualizado com status 200 (OK)
  } catch (err) {
    // Captura qualquer erro que possa ocorrer durante o processo
    return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
  }
});

// DELETE: Remove um usuário existente
server.delete("/usuarios/:id", async (req, res) => {
  // Define a rota DELETE para remover um usuário existente
  try {
    // Inicia um bloco de código try para lidar com possíveis erros
    const id = req.params.id; // Obtém o ID do usuário a ser removido a partir dos parâmetros da requisição

    // Encontra e remove o usuário com o ID especificado
    const usuario = await UserModel.findByIdAndDelete(id, req.body, {
      new: true, // Retorna o documento removido
    });

    return res.status(200).json(usuario); // Retorna o usuário removido com status 200 (OK)
  } catch (err) {
    // Captura qualquer erro que possa ocorrer durante o processo
    return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
  }
});

// Inicia o servidor na porta definida
server.listen(port, () => {
  console.log(`Rodando na porta ${port}!`); // Loga uma mensagem indicando que o servidor está rodando
  console.log(`Abra no seu navegador: http://127.0.0.1:${port}`); // Loga a URL onde o servidor pode ser acessado
});
