import { Router } from "express"
import DisciplinaController  from "../controllers/disciplinaController.js"

const routerDisciplina = Router()

routerDisciplina.post("/disciplina", DisciplinaController.criarDisciplina)

export default routerDisciplina