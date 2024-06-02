import { Router } from "express"
import { UsuarioController } from "../controllers/usuario.controller"

export const routerUsuario = Router()

routerUsuario.post('/usuarios', UsuarioController.cadastrarUsuario)