import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

export const rotaUsuario = Router();

rotaUsuario.get("/usuarios", UsuarioController.buscarUsuarios);
rotaUsuario.post("/usuarios", UsuarioController.cadastrarUsuario);
rotaUsuario.patch("/usuarios/:id", UsuarioController.editarUsuario);
rotaUsuario.delete("/usuarios/:id", UsuarioController.excluirUsuario);

export default rotaUsuario;
