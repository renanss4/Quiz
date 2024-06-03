import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

export const routerUsuario = Router();

routerUsuario.post("/usuarios", UsuarioController.cadastrarUsuario);
routerUsuario.get("/usuarios", UsuarioController.buscarUsuarios);

export default routerUsuario;
