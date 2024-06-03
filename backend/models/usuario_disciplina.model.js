import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const usuariosDisciplinasSchema = new Schema({
  usuario_id: {
    type: ObjectId,
    ref: "Usuarios",
  },
  disciplina_id: {
    type: ObjectId,
    ref: "Disciplinas",
  },
});

export const UsuariosDisciplinasModel = mongoose.model(
  "UsuariosDisciplinas",
  usuariosDisciplinasSchema
);

// export default UsersDisciplinas
