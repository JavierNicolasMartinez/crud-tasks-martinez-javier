import express from "express";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
// app.use("/api", router);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo en el puerto: ", PORT);
});
