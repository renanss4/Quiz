import { mongoose } from "mongoose"; // Importa o mongoose, um ORM para MongoDB
import { config } from "dotenv"; // Importa o dotenv para carregar variáveis de ambiente a partir de um arquivo .env

// Carrega as variáveis de ambiente do arquivo .env
config();

// Monta a URI de conexão com o MongoDB utilizando as variáveis de ambiente
const uri = `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;

// Função assíncrona para conectar ao banco de dados
export const connectToDatabase = async () => {
  try {
    // Tenta conectar ao MongoDB usando o mongoose
    await mongoose.connect(uri);
    console.log("Conexão ao banco de dados realizada com sucesso!"); // Loga uma mensagem de sucesso na conexão
  } catch (err) {
    console.error("Ocorreu um erro ao se conectar com o banco de dados:", err); // Loga uma mensagem de erro se a conexão falhar
  }
};
