import mongoose from "mongoose";
import { UsuariosDisciplinasModel } from "../models/usuario_disciplina.model.js";
import { UsuariosModel } from "../models/usuario.model.js";
import { DisciplinasModel } from "../models/disciplina.model.js";

export class UsuarioDisciplinaController {
  static async buscarUsuariosDisciplinas(req, res) {
    try {
      const alunosDisciplinas = await UsuariosDisciplinasModel.find();
      res.status(201).json({
        alunosDisciplinas,
        msg: "Mostrando todos alunos com disciplinas",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async buscarUmUsuarioDisciplina(req, res) {
    try {
      const parametro = req.params.id;

      //verifica se o parametro é igual a algum dos ids da linha, se for retorna todas linhas que contem aquele id
      const procurandoSeExiste = await UsuariosDisciplinasModel.find({
        $or: [
          { _id: parametro },
          { usuario_id: parametro },
          { disciplina_id: parametro },
        ],
      });

      // verifica se retorna um null ou um array vazio
      if (!procurandoSeExiste || procurandoSeExiste.length === 0) {
        return res.status(404).json({
          msg: "Esse id não esta vinculado a nenhum aluno e nenhuma disciplina",
        });
      }

      res.status(201).json({
        procurandoSeExiste,
        msg: "Mostrando os que tem o id igual ao parametro",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async cadastrarUsuarioDisciplina(req, res) {
    try {
      const { usuario_id, disciplina_id } = req.body;

      const usuario = await UsuariosModel.findById(usuario_id);

      const disciplina = await DisciplinasModel.findById(disciplina_id);

      // validando se aluno e disciplina existem nas outras collections
      if (!usuario || !disciplina) {
        return res
          .status(404)
          .json({ msg: "Aluno ou Disciplina não encontrados" });
      }
      // validando se o usuario é um aluno
      if (usuario.papel !== "aluno") {
        return res.status(404).json({ msg: "Esse usuário não é aluno" });
      }

      // validando se o aluno com a disciplina ja não foram cadastrados na collection
      const procurandoSeJaExiste = await UsuariosDisciplinasModel.find({
        $and: [{ usuario_id: usuario_id }, { disciplina_id: disciplina_id }],
      });

      if (procurandoSeJaExiste && procurandoSeJaExiste.length !== 0) {
        return res
          .status(404)
          .json({ msg: "Aluno com disciplina ja estão cadastrados" });
      }

      const disciplinaAluno = {
        usuario_id: usuario_id,
        disciplina_id: disciplina_id,
      };

      const response = await UsuariosDisciplinasModel.create(disciplinaAluno);

      res
        .status(201)
        .json({ response, msg: "Aluno com Disciplina criado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  }

  static async excluirUsuarioDisciplina(req, res) {
    try {
      const id = req.params.id;

      const userDisciplina = await UsuariosDisciplinasModel.findById(id);

      if (!userDisciplina) {
        return res
          .status(404)
          .json({ msg: "Disciplina com aluno não encontrado" });
      }

      const deletedUserDisciplina =
        await UsuariosDisciplinasModel.findOneAndDelete(id);

      res.status(200).json({
        deletedUserDisciplina,
        msg: "Disciplina com aluno com sucesso",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
