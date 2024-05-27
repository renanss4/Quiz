import express from "express";
import { config } from "dotenv";
import { connectToDatabase } from "./src/database/connect.js";

config();
connectToDatabase();

const port = process.env.PORT || 8080;

const app = express();

app.listen(port, async () => {
  console.log(`Running on port ${port}!`);
  console.log(`Open in your browser: http://127.0.0.1:${port}`);
});
