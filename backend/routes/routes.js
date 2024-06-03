import { Router } from "express";
import rotaUsuario from "./usuario.routes.js";
import rotaDisciplina from "./disciplina.routes.js";
import rotaUsuarioDisciplina from "./usuario_disciplina.routes.js";

export const rota = Router();

rota.use("/usuarios", rotaUsuario);
rota.use("/disciplinas", rotaDisciplina);
rota.use("/usuarios_disciplinas", rotaUsuarioDisciplina);
