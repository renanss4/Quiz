import mongoose from "mongoose";
import { DisciplinasModel } from "../models/disciplina.model.js";

export class DisciplinaController {
  static async cadastrarDisciplina(req, res) {
    try {
      const { nome, ano, semestre, prof_id } = req.body;

      const novaDisciplina = {
        nome,
        ano,
        semestre,
        prof_id,
      };

      const resposta = await DisciplinasModel.create(novaDisciplina);
      console.log(resposta);

      return res.status(201).send();
    } catch (err) {
      console.log(err);
    }
  }

  static async buscarDisciplinas(req, res) {
    try {
      const disciplinas = await DisciplinasModel.find();
      return res.status(200).send(disciplinas);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ Erro: `${err.message}` });
    }
  }

  static async editarDisciplina(req, res) {
    try {
      const id = req.params.id;

      const disciplina = await DisciplinasModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(disciplina);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  }

  static async excluirDisciplina(req, res) {
    try {
      const id = req.params.id;

      const disciplina = await DisciplinasModel.findByIdAndDelete(
        id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(disciplina);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  }
}
