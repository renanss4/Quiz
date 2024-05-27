import { config } from "dotenv";
import { MongoClient } from "mongodb";

// Carrega as variáveis de ambiente do arquivo .env
config();

const uri = `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}`;
const dbName = process.env.MONGODB_DBNAME;

export async function connectToDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    // const collections = await db.listCollections().toArray();
    // console.log(
    //   "Collections in database:",
    //   collections.map((col) => col.name)
    // );

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
