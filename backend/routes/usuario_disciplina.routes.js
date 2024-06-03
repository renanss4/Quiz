import { Router } from "express";
import { UsuarioDisciplinaController } from "../controllers/usuario_disciplina.controller.js";

const rotaUsuarioDisciplina = Router();

rotaUsuarioDisciplina.get(
  "/",
  UsuarioDisciplinaController.buscarUsuariosDisciplinas
);
rotaUsuarioDisciplina.get(
  "/:id",
  UsuarioDisciplinaController.buscarUmUsuarioDisciplina
);
rotaUsuarioDisciplina.post(
  "/",
  UsuarioDisciplinaController.cadastrarUsuarioDisciplina
);
rotaUsuarioDisciplina.delete(
  "/:id",
  UsuarioDisciplinaController.excluirUsuarioDisciplina
);

export default rotaUsuarioDisciplina;
