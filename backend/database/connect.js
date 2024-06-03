import { mongoose } from "mongoose"; // Imports mongoose, an ORM for MongoDB
import { config } from "dotenv"; // Imports dotenv to load environment variables from a .env file

// Loads environment variables from the .env file
config();

// Constructs the MongoDB connection URI using environment variables
const uri = `mongodb://${process.env.MONGODB_URL}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;

// Asynchronous function to connect to the database
export const connectToDatabase = async () => {
  try {
    // Tries to connect to MongoDB using mongoose
    await mongoose.connect(uri);
    console.log("Successfully connected to the database!"); // Logs a success message upon connection
  } catch (err) {
    console.error("An error occurred while connecting to the database:", err); // Logs an error message if the connection fails
  }
};
