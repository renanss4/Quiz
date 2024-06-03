import { Router } from "express";
import { DisciplinaController } from "../controllers/disciplina.controller.js";

const rotaDisciplina = Router();

rotaDisciplina.get("/", DisciplinaController.buscarDisciplinas);
rotaDisciplina.post("/", DisciplinaController.cadastrarDisciplina);
rotaDisciplina.patch("/:id", DisciplinaController.editarDisciplina);
rotaDisciplina.delete("/:id", DisciplinaController.excluirDisciplina);

export default rotaDisciplina;
