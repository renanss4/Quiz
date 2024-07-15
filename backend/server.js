import express from "express"; // Imports the Express framework to create the web server
import bodyParser from "body-parser"; // Imports body-parser to parse the body of requests
import cors from "cors"; // Imports CORS to allow requests from different origins
import { config } from "dotenv"; // Imports dotenv to load environment variables from a .env file
import { connectToDatabase } from "./database/connect.js"; // Imports the function to connect to the database
import routes from "./routes/routes.js"; // Imports the route configuration
import { errorHandler } from "./middlewares/errorHandler.js"; // Imports the error handler middleware

// Loads environment variables from the .env file
config();

// Connects to the Database
connectToDatabase();

const server = express(); // Creates an instance of the Express server

server.use(bodyParser.json()); // Configures body-parser to parse request bodies as JSON
server.use(cors()); // Enables CORS to allow requests from other origins
server.use("/", routes); // Sets up the route configuration
server.use(errorHandler); // Sets up the error handler middleware

const port = process.env.PORT || 8080; // Defines the port the server will run on, using the port defined in the environment variables or 8080 as default

// Starts the server on the defined port
server.listen(port, () => {
  console.log(`Running on port ${port}!`); // Logs a message indicating that the server is running
  // console.log(`Open in your browser: http://127.0.0.1:${port}`); // Logs the URL where the server can be accessed
});
