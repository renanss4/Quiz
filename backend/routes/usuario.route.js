import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

export const rotaUsuario = Router();

rotaUsuario.get("/", UsuarioController.buscarUsuarios);
rotaUsuario.post("/", UsuarioController.cadastrarUsuario);
rotaUsuario.patch("/:id", UsuarioController.editarUsuario);
rotaUsuario.delete("/:id", UsuarioController.excluirUsuario);

export default rotaUsuario;
