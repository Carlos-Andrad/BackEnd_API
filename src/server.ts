// src/server.ts

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import contatoRoutes from "./routes/contatoRoutes";

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes); // Prefixo para as rotas de autenticação
app.use("/contatos", contatoRoutes); // Prefixo para as rotas de contatos

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});