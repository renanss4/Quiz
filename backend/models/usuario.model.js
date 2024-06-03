import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuariosSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    minlength: 7,
  },
  papel: {
    type: String,
    required: true,
    enum: ["admin", "professor", "aluno"],
  },
});

export const UsuariosModel = mongoose.model("Usuarios", usuariosSchema);

// module.exports = UserModel;
