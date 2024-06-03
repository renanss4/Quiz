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

  static async editarUsuario(req, res) {
    try {
      // Inicia um bloco de código try para lidar com possíveis erros
      const id = req.params.id; // Obtém o ID do usuário a ser atualizado a partir dos parâmetros da requisição

      // Encontra e atualiza o usuário com o ID especificado, usando os dados do corpo da requisição
      const usuario = await UsuariosModel.findByIdAndUpdate(id, req.body, {
        new: true, // Retorna o novo documento atualizado
      });

      return res.status(200).json(usuario); // Retorna o usuário atualizado com status 200 (OK)
    } catch (err) {
      // Captura qualquer erro que possa ocorrer durante o processo
      return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
    }
  }

  static async excluirUsuario(req, res) {
    try {
      // Inicia um bloco de código try para lidar com possíveis erros
      const id = req.params.id; // Obtém o ID do usuário a ser removido a partir dos parâmetros da requisição

      // Encontra e remove o usuário com o ID especificado
      const usuario = await UsuariosModel.findByIdAndDelete(id, req.body, {
        new: true, // Retorna o documento removido
      });

      return res.status(200).json(usuario); // Retorna o usuário removido com status 200 (OK)
    } catch (err) {
      // Captura qualquer erro que possa ocorrer durante o processo
      return res.status(500).send(err.message); // Em caso de erro, retorna o status 500 (Erro Interno do Servidor) e a mensagem de erro
    }
  }
}
