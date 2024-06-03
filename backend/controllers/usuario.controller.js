import mongoose from "mongoose";
import { UsuariosModel } from "../models/usuario.model.js";

export class UsuarioController {
  static async cadastrarUsuario(req, res) {
    try {
      const { nome, matricula, email, senha, papel } = req.body;

      const novoUsuario = {
        nome,
        matricula,
        email,
        senha,
        papel,
      };

      const resposta = await UsuariosModel.create(novoUsuario);
      console.log(resposta);

      return res.status(201).send();
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .json({ "Erro de validação": `${error.message}` });
      }
      return res.status(500).json({ Erro: `${error.message}` });
    }
  }

  static async buscarUsuarios(req, res) {
    try {
      const usuarios = await UsuariosModel.find(); // Busca todos os usuários
      return res.status(200).json(usuarios); // Retorna os usuários em formato JSON
    } catch (error) {
      console.log(error);
      return res.status(500).json({ Erro: `${error.message}` }); // Trata erros e retorna status 500
    }
  }
}
