import { Router } from "express";
import rotaUsuario from "./usuario.route.js";
import rotaDisciplina from "./disciplina.route.js";
// import rotaUsuarioDisciplina from "./usuario_disciplina.route.js";

export const rota = Router();

rota.use("/usuarios", rotaUsuario);
rota.use("/disciplinas", rotaDisciplina);
// rota.use("/usuarios_disciplinas", rotaUsuarioDisciplina);
